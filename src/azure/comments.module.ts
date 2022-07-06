import { AzureAccountsModule } from './accounts.module'
import { AzureQueueModule } from '../shared/queue/azure/azure-queue.module'
import { CommentService } from '../shared/comments/comment.service'
import { ConfigModule } from '../shared/config/config.module'
import { ContentFilteringService } from '../shared/comments/content-filtering-service'
import { EmailsModule } from '..//shared/emails/emails.module'
import { forwardRef, Module } from '@nestjs/common'
import { PersistenceModule } from '../shared/persistence/persistence.module'

@Module({
  imports: [ConfigModule, EmailsModule, PersistenceModule, AzureQueueModule, forwardRef(() => AzureAccountsModule)],
  controllers: [],
  providers: [CommentService, ContentFilteringService],
  exports: [CommentService, ContentFilteringService],
})
export class AzureCommentsModule {}
