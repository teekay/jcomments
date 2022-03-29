import { ApiModule } from "../api/api.module";
import { INestApplicationContext, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

export async function bootstrap(): Promise<INestApplicationContext> {
    const app = await NestFactory.createApplicationContext(ApiModule)
    const logger = app.get(Logger)
    app.useLogger(logger)
    app.enableShutdownHooks()
  
    return app;
}