
import { repl } from '@nestjs/core';
import { ApiModule } from './api/api.module';

async function bootstrap() {
  await repl(ApiModule);
}
bootstrap();
