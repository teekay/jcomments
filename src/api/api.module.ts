import { AccountsModule } from '../shared/accounts/account.module'
import { Client } from 'pg'
import { CommentsController } from './comments.controller'
import { CommentsModule } from '../shared/comments/comments.module'
import { ConfigModule } from '../shared/config/config.module'
import { EmailsModule } from '../shared/emails/emails.module'
import { Inject, Module, OnApplicationShutdown } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { LoggerModule } from 'nestjs-pino'
import { PersistenceModule } from '../shared/persistence/persistence.module'
import { QueueModule } from '../shared/queue/queue.module'
import { Queue } from '../shared/queue/queue.interface'

@Module({
  imports: [
    AccountsModule,
    AccountsModule,
    ConfigModule,
    CommentsModule,
    EmailsModule,
    PersistenceModule,
    QueueModule,
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: true,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        prettifier: require('pino-colada'),
      },
    }),
  ],
  controllers: [CommentsController],
})
export class ApiModule implements OnApplicationShutdown {
  constructor(
    @Inject('PG_CLIENT') private client: Client,
    private queue: Queue,
    private readonly logger: Logger
  ) {}

  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.log(`Application exiting with code ${signal}`)
    await this.queue.stop()
    await this.client.end()
    this.logger.log('JamComments API stopped')
  }
}
