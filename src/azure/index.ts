import { AzureApiModule } from './azure-api.module'
import { INestApplicationContext, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

let application: INestApplicationContext

async function bootstrap(): Promise<INestApplicationContext> {
  const app = await NestFactory.createApplicationContext(AzureApiModule)
  const logger = app.get(Logger)
  app.useLogger(logger)
  app.enableShutdownHooks()

  return app
}

export async function appContext(): Promise<INestApplicationContext> {
  if (application) {
    return application
  }

  application = await bootstrap()
  return application
}
