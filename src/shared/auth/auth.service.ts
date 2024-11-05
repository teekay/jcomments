import crypto from 'crypto'
import {
  accountFromToken,
  changePassword,
  createPasswordResetToken,
  expirePendingTokens,
  isTokenUsable,
} from './auth.queries'
import { Account } from '../accounts/account.interface'
import { AccountService } from '../accounts/account.service'
import { Client } from 'pg'
import { ConfigService } from '../config/config.service'
import { EmailService } from '../emails/email.service'
import { Inject, Injectable } from '@nestjs/common'
import { loginFromToken } from '../../api/api.queries'
import moment from 'moment'
import { Request } from 'express'
import { SendMailService } from '../infra/sendmail.service'
import { v4 as uuidv4 } from 'uuid'
import { findAllValidTokens } from '../accounts/accounts.queries'
import { HttpRequest } from '@azure/functions'

@Injectable()
export class AuthService {
  constructor(
    @Inject('PG_CLIENT') private client: Client,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly sendMailService: SendMailService,
    private usersService: AccountService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.login(username, pass)
    if (user) {
      return user
    }

    return null
  }

  async accountFromToken(token: string): Promise<Account | null> {
    const accounts = await loginFromToken.run(
      {
        token: token,
      },
      this.client
    )
    if (accounts.length !== 1) {
      return null
    }

    const result = accounts[0]
    return {
      id: result.id,
      email: result.email,
      username: result.username,
      createdAt: new Date(result.created_at)
    }

  }

  async initiatePasswordReset(usernameOrEmail: string): Promise<void> {
    const account = await this.usersService.findByUsernameOrEmail(usernameOrEmail)
    if (!account) {
      return
    }

    // expire all pending reset tokens, if any
    await expirePendingTokens.run({ accountId: account.id, now: new Date() }, this.client)

    // create a new token
    const token = uuidv4()
    await createPasswordResetToken.run(
      {
        id: uuidv4(),
        token,
        accountId: account.id,
        createdAt: new Date(),
        expiresAt: moment().add(1, 'day').toDate(),
      },
      this.client
    )

    // email it to the account holder
    const email = this.emailService.passwordResetEmail(`${this.configService.adminUrl()}/auth/reset-password/${token}`)
    this.sendMailService.send(this.configService.mailgunSender(), account.email, email.subject, email.html, email.text)
  }

  async completePasswordReset(token: string, password: string): Promise<void> {
    const a = await accountFromToken.run({ token }, this.client)
    if (a.length !== 1) throw new Error('Data integrity violation or wrong token')
    const account = a[0]
    await changePassword.run({ accountId: account.id, password }, this.client)
    await expirePendingTokens.run({ accountId: account.id, now: new Date() }, this.client)
  }

  async isTokenValid(token: string, forDate: Date): Promise<boolean> {
    const t = await isTokenUsable.run({ token, date: forDate }, this.client)
    return t.length === 1
  }

  async tokensForAccount(accountId: string): Promise<string[]> {
    const tokens = await findAllValidTokens.run({ accountId }, this.client)

    return tokens.map(t => t.token)
  }

  async isHmacSignatureValid(
      req: Request | HttpRequest,
      expiryInSeconds: number,
      accountId: string,
      timestamp: string,
      signature: string,
      forDate: Date): Promise<HmacValidationResult> {
    const allTokens = await this.tokensForAccount(accountId)

    // Verify the request is not too old (e.g., 5 minutes)
    const now = Math.floor(forDate.getTime() / 1000)
    if (Math.abs(now - parseInt(timestamp)) > expiryInSeconds) {
      return HmacValidationResult.REQUEST_TOO_OLD
    }

    const tryValidate = (token: string): boolean => {
      // Reconstruct the string to verify
      const stringToSign = `${req.method}\n${req.url}\n${timestamp}`
      
      // Create HMAC signature
      const hmac = crypto.createHmac('sha256', token)
      hmac.update(stringToSign)
      const expectedSignature = hmac.digest('hex')

      return expectedSignature === signature
    }

    // see if at least one token matches the signature
    return allTokens.reduce((acc, e) => acc || tryValidate(e), false)
      ? HmacValidationResult.OK
      : HmacValidationResult.INVALID_SIGNATURE
  }
}

export enum HmacValidationResult {
  OK,
  INVALID_SIGNATURE,
  REQUEST_TOO_OLD,
}
