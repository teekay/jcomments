import { AccountService } from './account.service'
import { AkismetService } from '../comments/akismet.service'
import { CommentsModule } from '../comments/comments.module'
import { CryptoModule } from '../crypto/crypto.module'
import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TokenService } from './token.service'

@Module({
  imports: [forwardRef(() => CommentsModule), CryptoModule, PassportModule],
  controllers: [],
  providers: [AccountService, TokenService, AkismetService],
  exports: [AccountService, TokenService, AkismetService],
})
export class AccountsModule {}
