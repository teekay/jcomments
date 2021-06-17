import { ConfigModule } from '../config/config.module';
import { EmailService } from './email.service';
import { Module } from '@nestjs/common';
import { QueuedMailer } from './queued-mailer';
import { QueueModule } from '../queue/queue.module';
import { SendMailService } from './sendmail.service';

@Module({
  imports: [ConfigModule, QueueModule],
  controllers: [],
  providers: [EmailService, QueuedMailer, SendMailService],
  exports: [EmailService, QueuedMailer, SendMailService],
})
export class EmailsModule {}