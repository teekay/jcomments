import { AccountsModule } from './accounts/account.module'
import { AuthModule } from './auth/auth.module'
import { Client } from 'pg'
import { CommentsModule } from './comments/comments.module'
import { ConfigModule } from './config/config.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { EmailsModule } from './emails/emails.module'
import { HomeModule } from './home/home.module'
import { Inject, Module, OnApplicationShutdown } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { LoggerModule } from 'nestjs-pino'
import { PersistenceModule } from './persistence/persistence.module'
import PgBoss from 'pg-boss'
import { QueueModule } from './queue/queue.module'

@Module({
  imports: [AccountsModule, AuthModule, ConfigModule, EmailsModule, HomeModule, CommentsModule, DashboardModule, PersistenceModule, QueueModule,
    LoggerModule.forRoot({
    pinoHttp: {
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      prettyPrint: true,
      prettifier: require('pino-colada')
    },
}),],
})
export class WebModule implements OnApplicationShutdown {

  constructor(
    @Inject('PG_CLIENT') private client: Client,
    @Inject('PG_BOSS') private boss: PgBoss,
    private readonly logger: Logger) {}

  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.log(`Application exiting with code ${signal}`)
    await this.boss.stop()
    await this.client.end()
    this.logger.log("JamComments web stopped")
  }

}