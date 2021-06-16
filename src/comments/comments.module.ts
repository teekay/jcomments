import { AccountsModule } from '../accounts/account.module';
import { CommentService } from './comment.service'
import { CommentsController } from './comments.controller'
import { ConfigModule } from '../config/config.module';
import { ContentFilteringService } from './content-filtering-service'
import { EmailsModule } from '../emails/emails.module';
import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoginMiddleware } from '../accounts/login.middleware';
import { PersistenceModule } from '../persistence/persistence.module'

@Module({
  imports: [ConfigModule, EmailsModule, PersistenceModule, forwardRef(() => AccountsModule)],
  controllers: [CommentsController],
  providers: [CommentService, ContentFilteringService],
  exports: [CommentService]
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoginMiddleware)
      .forRoutes('comments');
  }
}
