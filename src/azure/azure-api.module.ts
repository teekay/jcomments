import { AzureAccountsModule } from './accounts.module'
import { AzureCommentsModule } from './comments.module'
import { AzureQueueModule } from '../shared/queue/azure/azure-queue.module'
import { AzureServiceBusQueue } from '../shared/queue/azure/azure-service-bus-queue'
import { Client } from 'pg'
import { ConfigModule } from '../shared/config/config.module'
import { Inject, Module, OnApplicationShutdown } from '@nestjs/common'
import { Logger, LoggerModule } from 'nestjs-pino'
import { PersistenceModule } from '../shared/persistence/persistence.module'

@Module({
  imports: [
    AzureAccountsModule,
    ConfigModule,
    AzureCommentsModule,
    PersistenceModule,
    AzureQueueModule,
    LoggerModule.forRoot(),
  ],
})
export class AzureApiModule implements OnApplicationShutdown {
  constructor(
    @Inject('PG_CLIENT') private client: Client,
    private queue: AzureServiceBusQueue,
    private readonly logger: Logger
  ) {}

  // TODO this is probably not being called by Azure Functions
  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.log(`Application exiting with code ${signal}`)
    await this.queue.stop()
    await this.client.end()
    this.logger.log('JamComments API stopped')
  }
}
