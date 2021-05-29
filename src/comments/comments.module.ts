import { Module } from '@nestjs/common'
import { PersistenceModule } from '../persistence/persistence.module'
import { CommentService } from './comment.service'
import { CommentsController } from './comments.controller'

@Module({
  imports: [PersistenceModule],
  controllers: [CommentsController],
  providers: [CommentService],
})
export class CommentsModule {}
