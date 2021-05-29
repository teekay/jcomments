import { Module } from '@nestjs/common'
import { databaseProviders } from './client'

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class PersistenceModule {}