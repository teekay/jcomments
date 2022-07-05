
import { AccountCloser } from './account.closer'
import { AccountsModule as AccountsModuleCore } from '../../shared/accounts/account.module'
import { CommentsModule } from '../../shared/comments/comments.module';
import { forwardRef, Module } from '@nestjs/common';
import { QueueModule } from '../../shared/queue/queue.module';

@Module({
  imports: [forwardRef(() => CommentsModule), AccountsModuleCore, QueueModule],
  providers: [AccountCloser],
  exports: [AccountCloser]
})
export class AccountsModule {
}