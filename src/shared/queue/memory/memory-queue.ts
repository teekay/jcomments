import { CommentEventBody } from '../../comments/comment.event'
import { ConfigService } from '../../config/config.service'
import { EmailService } from '../../emails/email.service'
import { Logger } from 'nestjs-pino'
import { Queue } from '../queue.interface'
import { SendMailService } from '../../infra/sendmail.service'

/**
 * In-memory queue implementation for SQLite mode.
 * Processes events synchronously - suitable for single-process, low-volume deployments.
 */
export class MemoryQueue implements Queue {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly sendMailService: SendMailService,
    private readonly logger: Logger
  ) {}

  async publish(event: CommentEventBody): Promise<void> {
    const { account, comment } = event
    this.logger.log('Processing comment event synchronously (memory queue)')

    try {
      const email = this.emailService.notifyOnSingleComment(
        comment,
        `${this.configService.adminUrl()}/dashboard`
      )

      await this.sendMailService.send(
        this.configService.mailgunSender(),
        account.email,
        email.subject,
        email.html,
        email.text
      )

      this.logger.log('Email notification sent successfully')
    } catch (error) {
      this.logger.error(`Failed to send email notification: ${error}`)
    }
  }

  async stop(): Promise<void> {
    // No cleanup needed for in-memory queue
  }
}
