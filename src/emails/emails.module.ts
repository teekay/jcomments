import { EmailService } from './email.service';
import { Module } from '@nestjs/common';
import { SendMailService } from './sendmail.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EmailService, SendMailService],
  exports: [EmailService, SendMailService],
})
export class EmailsModule {}