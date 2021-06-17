import { HomeController } from './home.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [HomeController],
  providers: [],
})
export class HomeModule {}