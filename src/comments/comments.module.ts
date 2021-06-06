import { AccountsModule } from '../accounts/account.module';
import { CommentService } from './comment.service'
import { CommentsController } from './comments.controller'
import { LoginMiddleware } from '../accounts/login.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { PersistenceModule } from '../persistence/persistence.module'

@Module({
  imports: [PersistenceModule, AccountsModule],
  controllers: [CommentsController],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoginMiddleware)
      .forRoutes('comments');
  }
}
