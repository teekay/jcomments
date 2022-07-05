import PgBoss from "pg-boss"
import { CommentEventBody } from "../../comments/comment.event"
import { ConfigService } from "../../config/config.service"
import { EmailService } from "../../emails/email.service"
import { Queue } from "../queue.interface"

export class PgBossQueue implements Queue {
    constructor(
        private readonly jobQueue: PgBoss,
        private readonly configService: ConfigService,
        private readonly emailService: EmailService
    ) {
      console.log('PgBossQueue instantiated')
    }

    async publish(event: CommentEventBody): Promise<void> {
        const { account, comment } = event
        const email = this.emailService.notifyOnSingleComment(comment, `${this.configService.adminUrl()}/dashboard`)

        this.jobQueue.publish('notify-on-new-comment-via-email', { account, email })
    }

    async stop(): Promise<void> {
      await this.jobQueue.stop()
    }
}