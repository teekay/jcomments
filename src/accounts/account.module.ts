import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PersistenceModule } from '../persistence/persistence.module'
import { TokenService } from './token.service'

@Module({
  imports: [PersistenceModule, PassportModule],
  controllers: [AccountController],
  providers: [AccountService, TokenService],
  exports: [AccountService, TokenService],
})
export class AccountsModule {
}
