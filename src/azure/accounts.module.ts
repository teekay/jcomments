import { AccountService } from '../shared/accounts/account.service'
import { AkismetService } from '../shared/comments/akismet.service'
import { LlmSpamService } from '../shared/comments/llm-spam.service'
import { AzureCommentsModule } from './comments.module'
import { CryptoModule } from '../shared/crypto/crypto.module'
import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PersistenceModule } from '../shared/persistence/persistence.module'
import { TokenService } from '../shared/accounts/token.service'

@Module({
  imports: [forwardRef(() => AzureCommentsModule), CryptoModule, PersistenceModule, PassportModule],
  controllers: [],
  providers: [AccountService, TokenService, AkismetService, LlmSpamService],
  exports: [AccountService, TokenService, AkismetService, LlmSpamService],
})
export class AzureAccountsModule {}
