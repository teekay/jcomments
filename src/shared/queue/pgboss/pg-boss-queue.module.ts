import { ConfigModule } from '../../config/config.module'
import { InfraModule } from '../../infra/infra.module'
import { jobQueueProviders } from './queue-providers'
import { Module } from '@nestjs/common'
import { QueuedMailer } from './queued-mailer'

@Module({
  imports: [ConfigModule, InfraModule],
  providers: [...jobQueueProviders, QueuedMailer],
  exports: [...jobQueueProviders, QueuedMailer],
})
export class PgBossQueueModule {}