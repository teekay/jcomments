import { ApiModule } from '../api/api.module'
import { INestApplicationContext, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

async function bootstrap(): Promise<INestApplicationContext> {
  const app = await NestFactory.createApplicationContext(ApiModule)
  const logger = app.get(Logger)
  app.useLogger(logger)
  app.enableShutdownHooks()

  return app
}

let application: INestApplicationContext;

export async function appContext(): Promise<INestApplicationContext> {
  if (application) {
    return application
  }

  application = await bootstrap()
  return application
}