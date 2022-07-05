import { AccountController } from './account.controller'
import { AccountsModule } from '../shared/accounts/account.module'
import { AccountsModule as AccountsModuleWeb } from './accounts/accounts.module'
import { AuthModule } from '../shared/auth/auth.module'
import { Client } from 'pg'
import { CommentsModule } from '../shared/comments/comments.module'
import { ConfigModule } from '../shared/config/config.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { EmailsModule } from '../shared/emails/emails.module'
import { HomeModule } from './home/home.module'
import { Inject, Module, OnApplicationShutdown } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { LoggerModule } from 'nestjs-pino'
import { PersistenceModule } from '../shared/persistence/persistence.module'
import PgBoss from 'pg-boss'
import { QueueModule } from '../shared/queue/queue.module'

@Module({
  imports: [
    AccountsModule,
    AccountsModuleWeb,
    AuthModule,
    ConfigModule,
    EmailsModule,
    HomeModule,
    CommentsModule,
    DashboardModule,
    PersistenceModule,
    QueueModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        prettyPrint: true,
        prettifier: require('pino-colada'),
      },
    }),
  ],
  controllers: [AccountController],
})
export class WebModule implements OnApplicationShutdown {
  constructor(
    @Inject('PG_CLIENT') private client: Client,
    @Inject('PG_BOSS') private boss: PgBoss,
    private readonly logger: Logger
  ) {}

  async onApplicationShutdown(signal?: string): Promise<void> {
    this.logger.log(`Application exiting with code ${signal}`)
    await this.boss.stop()
    await this.client.end()
    this.logger.log('JamComments web stopped')
  }
}
