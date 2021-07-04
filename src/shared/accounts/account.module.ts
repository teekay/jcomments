import { AccountCloser } from './account.closer'
import { AccountService } from './account.service'
import { AkismetService } from '../comments/akismet.service'
import { CommentsModule } from '../comments/comments.module'
import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PersistenceModule } from '../persistence/persistence.module'
import { QueueModule } from '../queue/queue.module';
import { TokenService } from './token.service'

@Module({
  imports: [forwardRef(() => CommentsModule), PersistenceModule, PassportModule, QueueModule],
  controllers: [],
  providers: [AccountService, TokenService, AkismetService, AccountCloser],
  exports: [AccountService, TokenService, AkismetService, AccountCloser],
})
export class AccountsModule {
}
