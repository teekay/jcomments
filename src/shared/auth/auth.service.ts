import crypto from 'crypto'
import { Account } from '../accounts/account.interface'
import { AccountService } from '../accounts/account.service'
import { ConfigService } from '../config/config.service'
import { EmailService } from '../emails/email.service'
import { Inject, Injectable } from '@nestjs/common'
import moment from 'moment'
import { SendMailService } from '../infra/sendmail.service'
import { v4 as uuidv4 } from 'uuid'
import {
  AUTH_REPOSITORY,
  IAuthRepository,
} from '../repositories/auth.repository.interface'
import {
  TOKEN_REPOSITORY,
  ITokenRepository,
} from '../repositories/token.repository.interface'
import {
  ACCOUNT_REPOSITORY,
  IAccountRepository,
} from '../repositories/account.repository.interface'
import { PasswordService } from '../crypto/password.service'

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository,
    @Inject(TOKEN_REPOSITORY) private tokenRepo: ITokenRepository,
    @Inject(ACCOUNT_REPOSITORY) private accountRepo: IAccountRepository,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly sendMailService: SendMailService,
    private readonly passwordService: PasswordService,
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
    const record = await this.authRepo.accountFromLoginToken(token)
    if (!record) return null

    return {
      id: record.id,
      email: record.email,
      username: record.username,
      createdAt: record.created_at,
    }
  }

  async initiatePasswordReset(usernameOrEmail: string): Promise<void> {
    const account = await this.usersService.findByUsernameOrEmail(usernameOrEmail)
    if (!account) {
      return
    }

    // expire all pending reset tokens, if any
    await this.authRepo.expirePendingTokens(account.id, new Date())

    // create a new token
    const token = uuidv4()
    await this.authRepo.createPasswordResetToken(
      uuidv4(),
      account.id,
      token,
      new Date(),
      moment().add(1, 'day').toDate()
    )

    // email it to the account holder
    const email = this.emailService.passwordResetEmail(`${this.configService.adminUrl()}/auth/reset-password/${token}`)
    this.sendMailService.send(this.configService.mailgunSender(), account.email, email.subject, email.html, email.text)
  }

  async completePasswordReset(token: string, password: string): Promise<void> {
    const record = await this.authRepo.accountFromToken(token)
    if (!record) throw new Error('Data integrity violation or wrong token')
    const passwordHash = await this.passwordService.hash(password)
    await this.accountRepo.updatePassword(record.id, passwordHash)
    await this.authRepo.expirePendingTokens(record.id, new Date())
  }

  async isTokenValid(token: string, forDate: Date): Promise<boolean> {
    return this.authRepo.isTokenUsable(token, forDate)
  }

  async tokensForAccount(accountId: string): Promise<string[]> {
    const tokens = await this.tokenRepo.findAllValidTokens(accountId)
    return tokens.map(t => t.token)
  }

  async isHmacSignatureValid(
      httpMethod: string,
      urlPath: string,
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
      const stringToSign = `${httpMethod}\n${urlPath}\n${timestamp}`

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
  OK = 'OK',
  INVALID_SIGNATURE = 'KO',
  REQUEST_TOO_OLD = 'OLD',
}
