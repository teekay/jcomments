import { AccountService } from '../shared/accounts/account.service'
import { AkismetService } from '../shared/comments/akismet.service'
import { AzureCommentsModule } from './comments.module'
import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PersistenceModule } from '../shared/persistence/persistence.module'
import { TokenService } from '../shared/accounts/token.service'

@Module({
  imports: [forwardRef(() => AzureCommentsModule), PersistenceModule, PassportModule],
  controllers: [],
  providers: [AccountService, TokenService, AkismetService],
  exports: [AccountService, TokenService, AkismetService],
})
export class AzureAccountsModule {
}
