
import { Module } from '@nestjs/common'
import { AuthService } from '../shared/auth/auth.service';
import { PersistenceModule } from '../shared/persistence/persistence.module'
import { ConfigModule } from '../shared/config/config.module';
import { EmailsModule } from '../shared/emails/emails.module';
import { AzureAccountsModule } from './accounts.module';

@Module({
   imports: [AzureAccountsModule, ConfigModule, EmailsModule, PersistenceModule],
   controllers: [],
   providers: [AuthService],
   exports: [AuthService],
})
export class AzureAuthModule {}