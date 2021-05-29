import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { Comment } from './comment.interface'
import { commentsForUrl, commentsForUrlSinceDate, postCommentForUrl } from './comments.queries'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class CommentService {

  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async create(comment: Comment): Promise<void> {
    await postCommentForUrl.run({
      id: uuidv4(),
      url: comment.postUrl,
      text: comment.text,
      name: comment.author.name,
      email: comment.author.email
    }, this.client)
  }

  async commentsForUrl(url: string, fromDate?: Date): Promise<Comment[]> {
    return (
      fromDate 
        ? await commentsForUrlSinceDate.run({ url, date: fromDate }, this.client)
        : await commentsForUrl.run({ url }, this.client)
      ).map(r => ({
      postUrl: r.page_url,
      text: r.comment,
      author: {
        name: r.reader_name,
        email: r.reader_email ?? ''
      }
    }))
  }

}