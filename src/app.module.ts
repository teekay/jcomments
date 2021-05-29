import { Module } from '@nestjs/common'
import { CommentsModule } from './comments/comments.module'
import { PersistenceModule } from './persistence/persistence.module'

@Module({
  imports: [CommentsModule, PersistenceModule],
})
export class AppModule {}