import { Module } from '@nestjs/common'
import { PersistenceModule } from '../persistence/persistence.module'
import { AccountService } from './account.service'

@Module({
  imports: [PersistenceModule],
  controllers: [],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountsModule {
}
