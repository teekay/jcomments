import { AccountsModule } from './accounts/account.module'
import { Client } from 'pg'
import { CommentsModule } from './comments/comments.module'
import { Inject, Module, OnApplicationShutdown } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { LoggerModule } from 'nestjs-pino'
import { PersistenceModule } from './persistence/persistence.module'
import PgBoss from 'pg-boss'
import { QueueModule } from './queue/queue.module'

@Module({
  imports: [AccountsModule, CommentsModule, PersistenceModule, QueueModule,
    LoggerModule.forRoot({
    pinoHttp: {
      prettyPrint: true,
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      prettifier: require('pino-colada')
    },
}),],
})
export class ApiModule implements OnApplicationShutdown {

  constructor(
    @Inject('PG_CLIENT') private client: Client,
    @Inject('PG_BOSS') private boss: PgBoss,
    private readonly logger: Logger ) {}

  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.log(`Application exiting with code ${signal}`)
    await this.boss.stop()
    await this.client.end()
    this.logger.log("JamComments API stopped")
  }

}