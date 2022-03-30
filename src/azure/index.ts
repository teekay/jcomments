import { ApiModule } from "../api/api.module"
import { INestApplicationContext, Logger } from "@nestjs/common"
import { migrate } from "postgres-migrations"
import { NestFactory } from "@nestjs/core"

export async function bootstrap(): Promise<INestApplicationContext> {
    const app = await NestFactory.createApplicationContext(ApiModule)
    const logger = app.get(Logger)
    app.useLogger(logger)
    app.enableShutdownHooks()
    const client = app.get('PG_CLIENT')
    // TODO move migration to a post-deployment task
    await migrate({ client }, `${__dirname}/../../../sql/migrations`)

    return app;
}