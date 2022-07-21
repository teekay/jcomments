import _ from 'lodash'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Logger } from 'nestjs-pino'
import { AuthService } from '../shared/auth/auth.service'
import { isAccount } from '../shared/accounts/account.interface.guard'

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token =
      req.headers['authorization']?.split(': ').pop()?.split(' ').pop() ?? req.body['token'] ?? req.query['token']
    if (!token) {
      res.status(400).end()
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
