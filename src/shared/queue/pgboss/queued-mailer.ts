import { Account } from '../../accounts/account.interface'
import { ConfigService } from '../../config/config.service'
import { Email } from '../../emails/email.interface'
import { Inject } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import PgBoss from 'pg-boss'
import { SendMailService } from '../../infra/sendmail.service'
import { isQueuedMailerJob } from './queued-mailer-payload.interface.guard'
import { PgBossQueues } from './queues'

export class QueuedMailer {
  constructor(
    @Inject('PG_BOSS') private readonly pgBoss: PgBoss,
    private readonly configService: ConfigService,
    private readonly sendMailService: SendMailService,
    private readonly logger: Logger
  ) {}

  async init(): Promise<void> {
    await this.pgBoss.work(PgBossQueues.NewComment, (job) => {
      this.logger.log(`Received a new job to process from queue ${PgBossQueues.NewComment}`)
      const payload = job.data
      if (!isQueuedMailerJob(payload)) {
        this.logger.error(`Cannot process this payload: ${JSON.stringify(payload)}`)
        throw new Error(`Unsupported paylod for email notification: ${JSON.stringify(payload)}`)
      }

      this.logger.log(JSON.stringify(payload))
      return this.sendNewCommentNotification(payload)
    })
  }

  private async sendNewCommentNotification(params: { account: Account; email: Email }): Promise<void> {
    this.logger.log('Sending the email notification')
    const { account, email } = params
    await this.sendMailService.send(
      this.configService.mailgunSender(),
      account.email,
      email.subject,
      email.html,
      email.text
    )
  }
}
