import { ApiModule } from './api.module'
import { config as dotenv } from 'dotenv'
import { Logger } from 'nestjs-pino'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

dotenv()

async function bootstrap() {
  const app = await NestFactory.create(ApiModule)
  app.enableCors()
  const logger = app.get(Logger)
  app.useLogger(logger)
  app.useGlobalPipes(new ValidationPipe())
  const port = +(process.env['API_PORT'] ?? 3000)

  await app.listen(port)
  logger.log(`JamComments API is running on: ${await app.getUrl()}`)
}

bootstrap()
