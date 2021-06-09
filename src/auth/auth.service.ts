
import { accountFromToken, changePassword, createPasswordResetToken, expirePendingTokens, isTokenUsable } from './auth.queries'
import { AccountService } from '../accounts/account.service'
import { Client } from 'pg'
import { EmailService } from '../emails/email.service'
import { Inject, Injectable } from '@nestjs/common'
import moment from 'moment'
import { SendMailService } from '../emails/sendmail.service'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AuthService {
  constructor(@Inject('PG_CLIENT') private client: Client,
    private readonly emailService: EmailService,
    private readonly sendMailService: SendMailService,
    private usersService: AccountService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.login(username, pass)
    if (user) {
      const { password, ...result } = user
      return result
    }
    return null
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
    await createPasswordResetToken.run({ 
      id: uuidv4(),
      token,
      accountId: account.id,
      createdAt: new Date(),
      expiresAt: moment().add(1, 'day').toDate()
    }, this.client)
    // email it to the account holder
    // TODO externalize config
    const email = this.emailService.passwordResetEmail(`http://${(process.env['HOST'] ?? '')}/auth/reset-password/${token}`)
    this.sendMailService.send('tomas@colladeo.com', account.email, email.subject, email.html, email.text)
  }

  async completePasswordReset(token: string, password: string): Promise<void> {
    const a = await accountFromToken.run({ token }, this.client)
    if (a.length !== 1) throw new Error("Data integrity violation or wrong token")
    const account = a[0]
    await changePassword.run({ accountId: account.id, password }, this.client)
    await expirePendingTokens.run({ accountId: account.id, now: new Date() }, this.client)
  }

  async isTokenValid(token: string, forDate: Date): Promise<boolean> {
    const t = await isTokenUsable.run({ token, date: forDate }, this.client)
    return t.length === 1
  }
}
