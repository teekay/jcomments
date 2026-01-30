import { AzureAccountsModule } from './accounts.module'
import { AzureCommentsModule } from './comments.module'
import { AzureQueueModule } from '../shared/queue/azure/azure-queue.module'
import { AzureServiceBusQueue } from '../shared/queue/azure/azure-service-bus-queue'
import { Client } from 'pg'
import { ConfigModule } from '../shared/config/config.module'
import { DatabaseModule, getDatabaseProvider } from '../shared/database/database.module'
import { Inject, Module, OnApplicationShutdown, Optional } from '@nestjs/common'
import { Logger, LoggerModule } from 'nestjs-pino'
import { AzureAuthModule } from './auth.module'
import Database from 'better-sqlite3'

@Module({
  imports: [
    DatabaseModule.forRoot(),
    AzureAuthModule,
    AzureAccountsModule,
    ConfigModule,
    AzureCommentsModule,
    AzureQueueModule,
    LoggerModule.forRoot(),
  ],
})
export class AzureApiModule implements OnApplicationShutdown {
  constructor(
    @Optional() @Inject('PG_CLIENT') private pgClient: Client | undefined,
    @Optional() @Inject('SQLITE_DB') private sqliteDb: Database.Database | undefined,
    private queue: AzureServiceBusQueue,
    private readonly logger: Logger
  ) {}

  // TODO this is probably not being called by Azure Functions
  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.log(`Application exiting with code ${signal}`)
    await this.queue.stop()

    const dbProvider = getDatabaseProvider()
    if (dbProvider === 'postgres' && this.pgClient) {
      await this.pgClient.end()
    } else if (dbProvider === 'sqlite' && this.sqliteDb) {
      this.sqliteDb.close()
    }

    this.logger.log('JamComments API stopped')
  }
}
