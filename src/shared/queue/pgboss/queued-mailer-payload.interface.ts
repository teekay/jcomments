import { Account } from '../../accounts/account.interface'
import { Email } from '../../emails/email.interface'

export interface QueuedMailerJob {
  account: Account
  email: Email
}
