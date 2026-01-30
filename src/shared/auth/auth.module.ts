import { AccountsModule } from '../accounts/account.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfigModule } from '../config/config.module'
import { CryptoModule } from '../crypto/crypto.module'
import { EmailsModule } from '../emails/emails.module'
import { forwardRef, Module } from '@nestjs/common'
import { LocalStrategy } from './auth.local.strategy'
import { PassportModule } from '@nestjs/passport'
import { SessionSerializer } from './session.serializer'

@Module({
  imports: [forwardRef(() => AccountsModule), ConfigModule, CryptoModule, EmailsModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService]
})
export class AuthModule {}
