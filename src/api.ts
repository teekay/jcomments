import { ApiModule } from './api/api.module'
import { config as dotenv } from 'dotenv'
import flash = require('connect-flash')
import { Logger } from 'nestjs-pino'
import { NestFactory } from '@nestjs/core'
import { QueuedMailer } from './shared/queue/pgboss/queued-mailer'
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
  const queuedMailer = app.get(QueuedMailer)
  await queuedMailer.init()

  const port = +(process.env['API_PORT'] ?? 3000)
  await app.listen(port)
  logger.log(`JamComments API is running on: ${await app.getUrl()}`)
}

bootstrap()
