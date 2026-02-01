import { AccountsModule } from '../accounts/account.module'
import { AuthModule } from '../auth/auth.module'
import { CommentService } from './comment.service'
import { ConfigModule } from '../config/config.module'
import { ContentFilteringService } from './content-filtering-service'
import { EmailsModule } from '../emails/emails.module'
import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { BrowserLoginMiddleware, HmacLoginMiddleware } from '../../api/login.middleware'

@Module({
  imports: [AuthModule, ConfigModule, EmailsModule, forwardRef(() => AccountsModule)],
  controllers: [],
  providers: [CommentService, ContentFilteringService],
  exports: [CommentService, ContentFilteringService],
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(BrowserLoginMiddleware)
      .exclude({ path: 'comments/:commentId', method: RequestMethod.DELETE})
      .forRoutes('comments')

    consumer.apply(HmacLoginMiddleware)
      .forRoutes({ path: 'comments/:commentId', method: RequestMethod.DELETE})
  }
}
