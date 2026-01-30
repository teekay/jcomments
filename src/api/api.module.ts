import { AccountsModule } from '../shared/accounts/account.module'
import { Client } from 'pg'
import { CommentsController } from './comments.controller'
import { CommentsModule } from '../shared/comments/comments.module'
import { ConfigModule } from '../shared/config/config.module'
import { DatabaseModule, getDatabaseProvider } from '../shared/database/database.module'
import { EmailsModule } from '../shared/emails/emails.module'
import { Inject, Module, OnApplicationShutdown, Optional } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { loggerConfig } from '../shared/logging/logging-setup'
import { LoggerModule } from 'nestjs-pino'
import { QueueModule, getQueueProvider } from '../shared/queue/queue.module'
import { AuthModule } from '../shared/auth/auth.module'
import Database from 'better-sqlite3'
import PgBoss from 'pg-boss'

@Module({
  imports: [
    DatabaseModule.forRoot(),
    QueueModule.forRoot(),
    AccountsModule,
    AuthModule,
    ConfigModule,
    CommentsModule,
    EmailsModule,
    LoggerModule.forRoot(loggerConfig()),
  ],
  controllers: [CommentsController],
})
export class ApiModule implements OnApplicationShutdown {
  constructor(
    @Optional() @Inject('PG_CLIENT') private pgClient: Client | undefined,
    @Optional() @Inject('SQLITE_DB') private sqliteDb: Database.Database | undefined,
    @Optional() @Inject('PG_BOSS') private boss: PgBoss | undefined,
    private readonly logger: Logger
  ) {}

  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.log(`Application exiting with code ${signal}`)

    const queueProvider = getQueueProvider()
    if (queueProvider === 'pgboss' && this.boss) {
      await this.boss.stop()
    }

    const dbProvider = getDatabaseProvider()
    if (dbProvider === 'postgres' && this.pgClient) {
      await this.pgClient.end()
    } else if (dbProvider === 'sqlite' && this.sqliteDb) {
      this.sqliteDb.close()
    }

    this.logger.log('JamComments API stopped')
  }
}
