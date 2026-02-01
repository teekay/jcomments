import { ApiModule } from './api/api.module'
import { config as dotenv } from 'dotenv'
import flash = require('connect-flash')
import { Logger } from 'nestjs-pino'
import { NestFactory } from '@nestjs/core'
import { getQueueProvider } from './shared/queue/queue.module'
import { QueuedMailer } from './shared/queue/pgboss/queued-mailer'
import { MemoryQueuedMailer } from './shared/queue/memory/memory-queued-mailer'
import { ValidationPipe } from '@nestjs/common'

dotenv()

async function bootstrap() {
  const app = await NestFactory.create(ApiModule)
  app.enableCors()
  app.use(flash())
  const logger = app.get(Logger)
  app.useLogger(logger)
  app.getHttpAdapter().getInstance().disable('x-powered-by')
  app.useGlobalPipes(new ValidationPipe())

  // Starts listening for shutdown hooks
  app.enableShutdownHooks()

  // initialize the job queue
  const queueProvider = getQueueProvider()
  if (queueProvider === 'pgboss') {
    const queuedMailer = app.get(QueuedMailer)
    await queuedMailer.init()
  } else {
    const memoryMailer = app.get(MemoryQueuedMailer)
    await memoryMailer.init()
  }

  const port = +(process.env['API_PORT'] ?? 3000)
  await app.listen(port)
  logger.log(`JamComments API is running on: ${await app.getUrl()}`)
}

bootstrap()
