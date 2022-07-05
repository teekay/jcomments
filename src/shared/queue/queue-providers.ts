import { AzureServiceBusQueue } from './azure-service-bus-queue'
import { ConfigService } from '../config/config.service'
import { EmailService } from '../emails/email.service'
import PgBoss from 'pg-boss'
import { PgBossQueue } from './pg-boss-queue'
import { Queue } from './queue.interface'
import { ServiceBusClient } from '@azure/service-bus'

let pgBoss: PgBoss | null = null

export const jobQueueProviders = [
  {
    provide: Queue,
    useFactory: async (): Promise<Queue> => {
      if (process.env['SERVICEBUS_CONNECTION']) {
        return new AzureServiceBusQueue(new ServiceBusClient(process.env['SERVICEBUS_CONNECTION']))
      }
      return new PgBossQueue(await boss(), new ConfigService(), new EmailService())
    }
  },
  {
    provide: 'PG_BOSS',
    useFactory: boss
  }
]

async function boss(): Promise<PgBoss> {
  if (pgBoss) {
    console.log('Using cached boss')
    return pgBoss
  }

  const num = Math.random()
  console.log('Instantiating PgBoss ' + num.toString())
  const c = {
    host: process.env.PGHOST ?? '127.0.0.1',
    port: (process.env.PGPORT ? Number(process.env.PGPORT) : undefined) ?? 5432,
    user: process.env.PGUSER ?? 'postgres',
    password: process.env.PGPASSWORD ?? 'password',
    database: process.env.PGDATABASE ?? 'postgres',
    ssl: process.env.PGSSLMODE === 'require'
  }
  const connectionString = `postgres://${c.user}:${encodeURIComponent(c.password)}@${c.host}:${c.port}/${c.database}${c.ssl ? '?sslmode=require' : ''}`
  const queue = new PgBoss(connectionString)
  await queue.start()
  pgBoss = queue
  console.log('PgBoss started')
  return queue
}