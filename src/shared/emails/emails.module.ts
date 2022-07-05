import { ConfigModule } from '../config/config.module';
import { EmailService } from './email.service';
import { Module } from '@nestjs/common';
import { SendMailService } from '../infra/sendmail.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [EmailService, SendMailService],
  exports: [EmailService, SendMailService],
})
export class EmailsModule {}