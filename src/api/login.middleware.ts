import _ from 'lodash'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Logger } from 'nestjs-pino'
import { AuthService, HmacValidationResult } from '../shared/auth/auth.service'
import { isAccount } from '../shared/accounts/account.interface.guard'

@Injectable()
export class BrowserLoginMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token =
      req.headers['authorization']?.split(': ').pop()?.split(' ').pop() ?? req.body['token'] ?? req.query['token']
    if (!token) {
      this.logger.warn(`No API token supplied`)
      res.status(400).json({message: 'Auth token required'})
      return
    }

    const account = await this.authService.accountFromToken(token)
    if (!isAccount(account)) {
      this.logger.error('Fucked up the Account object')
      res.status(500).end()
      return
    }
    
    if (!account) {
      this.logger.warn(`Wrong API token supplied`)
      res.status(403).end()
      return
    }

    _.set(req, 'account', account)
    next()
  }
}

@Injectable()
export class HmacLoginMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger) {}

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
      // Get the timestamp and signature from headers
      const timestamp = req.headers['x-timestamp'] as string
      const providedSignature = req.headers['x-signature'] as string
      const accountId = req.headers['x-account-id'] as string

      if (!timestamp || !providedSignature || !accountId) {
        this.logger.warn(`Missing headers`)
        res.status(400).end()

        return
      }

      const forDate = new Date()
      console.log(`Date: ${forDate}`)
      const signatureVerificationResult = await this.authService.isHmacSignatureValid(
        'DELETE',
        req.url, // gonna be relative - /comments/123
        300,
        accountId,
        timestamp,
        providedSignature,
        forDate
      )
      
      // Verify the request is not too old (e.g., 5 minutes)
      if (signatureVerificationResult === HmacValidationResult.REQUEST_TOO_OLD) {
        const now = Math.floor(forDate.getTime() / 1000)
        this.logger.warn(`Request too old: ${Math.abs(now - parseInt(timestamp))}s`)
        res.status(429).end()

        return
      }
      
      // see if at least one token matches the signature
      if (signatureVerificationResult !== HmacValidationResult.OK) {
        this.logger.warn(`Invalid signature`)
        res.status(403).end()

        return
      }

      this.logger.log('Signature verified')
      next()
    }
}