import _ from 'lodash'
import { ApiModule } from './api.module'
import { Logger } from 'nestjs-pino'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(ApiModule)
  const logger = app.get(Logger)
  app.useLogger(logger)
  app.useGlobalPipes(new ValidationPipe())
  const port = +(process.env['API_PORT'] ?? 3000)

  await app.listen(port)
  logger.log(`JamComments API is running on: ${await app.getUrl()}`)
}

bootstrap()
