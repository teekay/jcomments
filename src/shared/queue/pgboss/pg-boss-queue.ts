import PgBoss from 'pg-boss'
import { CommentEventBody } from '../../comments/comment.event'
import { ConfigService } from '../../config/config.service'
import { EmailService } from '../../emails/email.service'
import { Logger } from 'nestjs-pino'
import { Queue } from '../queue.interface'
import { QueuedMailerJob } from './queued-mailer-payload.interface'
import { PgBossQueues } from './queues'

export class PgBossQueue implements Queue {
  constructor(
    private readonly jobQueue: PgBoss,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly logger: Logger
  ) {}

  async publish(event: CommentEventBody): Promise<void> {
    const { account, comment } = event
    const email = this.emailService.notifyOnSingleComment(comment, `${this.configService.adminUrl()}/dashboard`)
    const payload: QueuedMailerJob = { account, email }
    this.logger.log(`Sending a job to PgBoss queue ${PgBossQueues.NewComment}`)

    this.jobQueue.send(PgBossQueues.NewComment, payload)
  }

  async stop(): Promise<void> {
    await this.jobQueue.stop()
  }
}
