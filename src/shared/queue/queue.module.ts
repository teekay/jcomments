import { DynamicModule, Module } from '@nestjs/common'
import { getDatabaseProvider } from '../database/database.module'
import { PgBossQueueModule } from './pgboss/pg-boss-queue.module'
import { MemoryQueueModule } from './memory/memory-queue.module'

export type QueueProvider = 'pgboss' | 'memory'

export function getQueueProvider(): QueueProvider {
  // Allow explicit override via QUEUE_PROVIDER
  const explicit = process.env.QUEUE_PROVIDER?.toLowerCase()
  if (explicit === 'pgboss') return 'pgboss'
  if (explicit === 'memory') return 'memory'

  // Auto-detect based on database provider
  const dbProvider = getDatabaseProvider()
  return dbProvider === 'sqlite' ? 'memory' : 'pgboss'
}

@Module({})
export class QueueModule {
  static forRoot(): DynamicModule {
    const provider = getQueueProvider()

    if (provider === 'memory') {
      return {
        module: QueueModule,
        imports: [MemoryQueueModule],
        exports: [MemoryQueueModule],
      }
    }

    return {
      module: QueueModule,
      imports: [PgBossQueueModule],
      exports: [PgBossQueueModule],
    }
  }
}
