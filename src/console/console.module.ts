import { Module } from '@nestjs/common';
import { CliService } from './console.service';
import { ConsoleModule } from 'nestjs-console';
import { AccountsModule } from '../accounts/account.module';

@Module({
  imports: [AccountsModule, ConsoleModule],
  providers: [CliService],
})
export class CliModule {}