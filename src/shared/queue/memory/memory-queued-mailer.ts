import { Injectable } from '@nestjs/common'
import { Logger } from 'nestjs-pino'

/**
 * No-op mailer for memory queue mode.
 * Since MemoryQueue processes events synchronously, there's no need
 * for a separate worker process.
 */
@Injectable()
export class MemoryQueuedMailer {
  constructor(private readonly logger: Logger) {}

  async init(): Promise<void> {
    this.logger.log('Memory queue mailer initialized (no background worker needed)')
  }
}
