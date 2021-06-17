import { AccountsModule } from '../shared/accounts/account.module';
import { CliService } from './console.service';
import { ConsoleModule } from 'nestjs-console';
import { LoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { PersistenceModule } from '../shared/persistence/persistence.module';

@Module({
  imports: [AccountsModule, ConsoleModule, PersistenceModule,
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: true,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        prettifier: require('pino-colada')
      },
  })],
  providers: [CliService],
})
export class CliModule {}