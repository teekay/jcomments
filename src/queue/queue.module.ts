import { Module } from '@nestjs/common'
import { jobQueueProviders } from './pg-boss'

@Module({
  providers: [...jobQueueProviders],
  exports: [...jobQueueProviders],
})
export class QueueModule {}