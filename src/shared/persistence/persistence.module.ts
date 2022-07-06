import { databaseProviders } from './client'
import { Module } from '@nestjs/common'

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class PersistenceModule {}
