import { AccountsModule } from '../accounts/account.module';
import { CommentService } from './comment.service'
import { ConfigModule } from '../config/config.module';
import { ContentFilteringService } from './content-filtering-service'
import { EmailsModule } from '../emails/emails.module';
import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoginMiddleware } from '../../api/login.middleware';
import { PersistenceModule } from '../persistence/persistence.module'
import { PgBossQueueModule } from '../queue/pgboss/pg-boss-queue.module';

@Module({
  imports: [ConfigModule, EmailsModule, PersistenceModule, PgBossQueueModule, forwardRef(() => AccountsModule)],
  controllers: [],
  providers: [CommentService, ContentFilteringService],
  exports: [CommentService, ContentFilteringService]
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoginMiddleware)
      .forRoutes('comments');
  }
}
