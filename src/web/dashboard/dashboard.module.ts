import { AuthModule } from '../../shared/auth/auth.module';
import { CommentsModule } from '../../shared/comments/comments.module';
import { DashboardController } from './dashboard.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, CommentsModule],
  controllers: [DashboardController],
  providers: [],
})
export class DashboardModule {}