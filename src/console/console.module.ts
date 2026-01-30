import { AccountsModule } from '../shared/accounts/account.module'
import { CliService } from './console.service'
import { CommentsModule } from '../shared/comments/comments.module'
import { ConsoleModule } from 'nestjs-console'
import { DatabaseModule } from '../shared/database/database.module'
import { loggerConfig } from '../shared/logging/logging-setup'
import { LoggerModule } from 'nestjs-pino'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    DatabaseModule.forRoot(),
    AccountsModule,
    ConsoleModule,
    CommentsModule,
    LoggerModule.forRoot(loggerConfig()),
  ],
  providers: [CliService],
})
export class CliModule {}
