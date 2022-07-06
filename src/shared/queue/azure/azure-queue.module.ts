import { Module } from '@nestjs/common'
import { jobQueueProvider } from './azure-queue-provider'

@Module({
  providers: [...jobQueueProvider],
  exports: [...jobQueueProvider],
})
export class AzureQueueModule {}