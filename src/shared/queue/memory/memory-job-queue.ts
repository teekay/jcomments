import { Injectable } from '@nestjs/common'

type JobHandler = (job: { data: unknown }) => Promise<void> | void

/**
 * In-memory job queue that mimics pg-boss interface.
 * Jobs are processed immediately (synchronously) when sent.
 */
@Injectable()
export class MemoryJobQueue {
  private handlers: Map<string, JobHandler> = new Map()

  /**
   * Register a worker for a queue. Compatible with pg-boss.work() signature.
   */
  async work(queueName: string, handler: JobHandler): Promise<void> {
    this.handlers.set(queueName, handler)
  }

  /**
   * Send a job to a queue. Compatible with pg-boss.send() signature.
   * Jobs are processed immediately if a handler is registered.
   */
  async send(queueName: string, data: unknown): Promise<string | null> {
    const handler = this.handlers.get(queueName)
    if (handler) {
      try {
        await handler({ data })
      } catch (err) {
        console.error(`[MemoryJobQueue] Handler error for queue "${queueName}":`, err)
      }
    }
    return 'memory-job-' + Date.now()
  }

  /**
   * No-op for compatibility with pg-boss.stop()
   */
  async stop(): Promise<void> {
    this.handlers.clear()
  }
}
