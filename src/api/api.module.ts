import { AccountsModule } from '../shared/accounts/account.module'
import { Client } from 'pg'
import { CommentsController } from './comments.controller'
import { CommentsModule } from '../shared/comments/comments.module'
import { ConfigModule } from '../shared/config/config.module'
import { EmailsModule } from '../shared/emails/emails.module'
import { Inject, Module, OnApplicationShutdown } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { loggerConfig } from '../shared/logging/logging-setup'
import { LoggerModule } from 'nestjs-pino'
import { PersistenceModule } from '../shared/persistence/persistence.module'
import { PgBossQueueModule } from '../shared/queue/pgboss/pg-boss-queue.module'
import { PgBossQueue } from '../shared/queue/pgboss/pg-boss-queue'
import { AuthModule } from '../shared/auth/auth.module'

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    ConfigModule,
    CommentsModule,
    EmailsModule,
    PersistenceModule,
    PgBossQueueModule,
    LoggerModule.forRoot(loggerConfig()),
  ],
  controllers: [CommentsController],
})
export class ApiModule implements OnApplicationShutdown {
  constructor(
    @Inject('PG_CLIENT') private client: Client,
    private queue: PgBossQueue,
    private readonly logger: Logger
  ) {}

  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.log(`Application exiting with code ${signal}`)
    await this.queue.stop()
    await this.client.end()
    this.logger.log('JamComments API stopped')
  }
}
