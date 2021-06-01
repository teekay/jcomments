import { AccountsModule } from '../accounts/account.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './auth.local.strategy'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [AccountsModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {
}
