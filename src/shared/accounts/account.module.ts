import { AccountService } from './account.service'
import { AkismetService } from '../comments/akismet.service'
import { LlmSpamService } from '../comments/llm-spam.service'
import { CommentsModule } from '../comments/comments.module'
import { CryptoModule } from '../crypto/crypto.module'
import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TokenService } from './token.service'

@Module({
  imports: [forwardRef(() => CommentsModule), CryptoModule, PassportModule],
  controllers: [],
  providers: [AccountService, TokenService, AkismetService, LlmSpamService],
  exports: [AccountService, TokenService, AkismetService, LlmSpamService],
})
export class AccountsModule {}
