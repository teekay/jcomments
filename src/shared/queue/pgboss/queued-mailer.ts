import { ConfigService } from "../../config/config.service"
import { Inject } from "@nestjs/common"
//import { Logger } from 'nestjs-pino'
import PgBoss from "pg-boss"
import { SendMailService } from "../../infra/sendmail.service"

export class QueuedMailer {
  constructor(
    @Inject('PG_BOSS') private readonly pgBoss: PgBoss,
    private readonly configService: ConfigService,
    private readonly sendMailService: SendMailService) {}

  async init(): Promise<void> {
    await this.pgBoss.subscribe('notify-on-new-comment-via-email', job => this.sendNewCommentNotification(job.data))
  }

  private async sendNewCommentNotification(params): Promise<void> {
    const { account, email } = params
    await this.sendMailService.send(this.configService.mailgunSender(), account.email, email.subject, email.html, email.text)
  }

}