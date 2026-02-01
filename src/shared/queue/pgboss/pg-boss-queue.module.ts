import { ConfigModule } from '../../config/config.module'
import { InfraModule } from '../../infra/infra.module'
import { jobQueueProviders } from './queue-providers'
import { Global, Module } from '@nestjs/common'
import { QueuedMailer } from './queued-mailer'
import { EmailsModule } from '../../emails/emails.module'
import { Queue } from '../queue.interface'

@Global()
@Module({
  imports: [ConfigModule, EmailsModule, InfraModule],
  providers: [...jobQueueProviders, QueuedMailer],
  exports: [Queue, 'PG_BOSS', QueuedMailer],
})
export class PgBossQueueModule {}
