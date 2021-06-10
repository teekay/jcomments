import { AccountsModule } from '../accounts/account.module';
import { CommentService } from './comment.service'
import { CommentsController } from './comments.controller'
import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoginMiddleware } from '../accounts/login.middleware';
import { PersistenceModule } from '../persistence/persistence.module'

@Module({
  imports: [PersistenceModule, forwardRef(() => AccountsModule)],
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
