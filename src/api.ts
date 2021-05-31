import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from 'nestjs-pino'

require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false })
  const logger = app.get(Logger)
  app.useLogger(logger)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
