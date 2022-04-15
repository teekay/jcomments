import { Module } from '@nestjs/common'
import { jobQueueProviders } from './queue-providers'

@Module({
  providers: [...jobQueueProviders],
  exports: [...jobQueueProviders],
})
export class QueueModule {}