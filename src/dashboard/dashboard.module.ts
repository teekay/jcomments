import { AuthModule } from '../auth/auth.module';
import { CommentsModule } from '../comments/comments.module';
import { DashboardController } from './dashboard.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, CommentsModule],
  controllers: [DashboardController],
  providers: [],
})
export class DashboardModule {}