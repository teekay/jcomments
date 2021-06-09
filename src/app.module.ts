import { AccountsModule } from './accounts/account.module'
import { AuthModule } from './auth/auth.module'
import { Client } from 'pg'
import { CommentsModule } from './comments/comments.module'
import { EmailsModule } from './emails/emails.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { HomeModule } from './home/home.module'
import { Inject, Module, OnApplicationShutdown } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { PersistenceModule } from './persistence/persistence.module'

@Module({
  imports: [AccountsModule, AuthModule, EmailsModule, HomeModule, CommentsModule, DashboardModule, PersistenceModule, 
    LoggerModule.forRoot({
    pinoHttp: {
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      prettyPrint: true,
      prettifier: require('pino-colada')
    },
}),],
})
export class AppModule implements OnApplicationShutdown {

  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async onApplicationShutdown(signal?: string) {
    // TODO haven't seen this invoked yet
    console.log(`Application exiting with code ${signal}`)
    await this.client.end()
  }

}