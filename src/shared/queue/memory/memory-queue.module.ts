import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '../../config/config.module'
import { ConfigService } from '../../config/config.service'
import { EmailService } from '../../emails/email.service'
import { EmailsModule } from '../../emails/emails.module'
import { InfraModule } from '../../infra/infra.module'
import { Logger } from 'nestjs-pino'
import { MemoryQueue } from './memory-queue'
import { MemoryQueuedMailer } from './memory-queued-mailer'
import { MemoryJobQueue } from './memory-job-queue'
import { Queue } from '../queue.interface'
import { SendMailService } from '../../infra/sendmail.service'

const memoryQueueProviders = [
  {
    provide: Queue,
    useFactory: (
      configService: ConfigService,
      emailService: EmailService,
      sendMailService: SendMailService,
      logger: Logger
    ) => new MemoryQueue(configService, emailService, sendMailService, logger),
    inject: [ConfigService, EmailService, SendMailService, Logger],
  },
  {
    provide: 'QueuedMailer',
    useClass: MemoryQueuedMailer,
  },
  MemoryQueuedMailer,
  {
    provide: 'PG_BOSS',
    useClass: MemoryJobQueue,
  },
]

@Global()
@Module({
  imports: [ConfigModule, EmailsModule, InfraModule],
  providers: memoryQueueProviders,
  exports: [Queue, 'QueuedMailer', MemoryQueuedMailer, 'PG_BOSS'],
})
export class MemoryQueueModule {}
