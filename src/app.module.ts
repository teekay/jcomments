import { Inject, Module, OnApplicationShutdown } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { Client } from 'pg'
import { CommentsModule } from './comments/comments.module'
import { PersistenceModule } from './persistence/persistence.module'

@Module({
  imports: [CommentsModule, PersistenceModule,
    LoggerModule.forRoot({
    pinoHttp: { prettyPrint: true },
}),],
})
export class AppModule implements OnApplicationShutdown {

  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async onApplicationShutdown(signal?: string) {
    console.log(`Application exiting with code ${signal}`)
    await this.client.end()
  }

}