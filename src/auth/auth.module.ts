import { AccountsModule } from '../accounts/account.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfigModule } from '../config/config.module'
import { EmailsModule } from '../emails/emails.module'
import { LocalStrategy } from './auth.local.strategy'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PersistenceModule } from '../persistence/persistence.module'
import { SessionSerializer } from './session.serializer'

@Module({
  imports: [AccountsModule, ConfigModule, EmailsModule, PassportModule, PersistenceModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {
}
