import { Module } from '@nestjs/common'
import { PersistenceModule } from '../persistence/persistence.module'
import { AccountService } from './account.service'
import { TokenService } from './token.service'

@Module({
  imports: [PersistenceModule],
  controllers: [],
  providers: [AccountService, TokenService],
  exports: [AccountService, TokenService],
})
export class AccountsModule {
}
