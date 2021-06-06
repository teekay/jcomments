import { AccountsModule } from './accounts/account.module'
import { Client } from 'pg'
import { CommentsModule } from './comments/comments.module'
import { Inject, Module, OnApplicationShutdown } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { PersistenceModule } from './persistence/persistence.module'

@Module({
  imports: [AccountsModule, CommentsModule, PersistenceModule, 
    LoggerModule.forRoot({
    pinoHttp: {
      prettyPrint: true,
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      prettifier: require('pino-colada')
    },
}),],
})
export class ApiModule implements OnApplicationShutdown {

  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async onApplicationShutdown(signal?: string) {
    // TODO haven't seen this invoked yet
    console.log(`Application exiting with code ${signal}`)
    await this.client.end()
  }

}