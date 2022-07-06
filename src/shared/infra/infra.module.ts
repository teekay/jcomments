import { ConfigModule } from '../config/config.module'
import { Module } from '@nestjs/common'
import { SendMailService } from './sendmail.service'

@Module({
  imports: [ConfigModule],
  providers: [SendMailService],
  exports: [SendMailService],
})
export class InfraModule {}
