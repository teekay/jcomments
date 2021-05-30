import { Account } from '../accounts/account.interface'
import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { Comment, CommentBase } from './comment.interface'
import { commentsForUrl, commentsForUrlSinceDate, postCommentForUrl } from './comments.queries'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class CommentService {

  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async create(account: Account, comment: Comment): Promise<void> {
    await postCommentForUrl.run({
      id: uuidv4(),
      accountId: account.id,
      url: comment.postUrl,
      text: comment.text,
      name: comment.author.name,
      email: comment.author.email
    }, this.client)
  }

  async commentsForUrl(account: Account, url: string, fromDate?: Date): Promise<CommentBase[]> {
    return (
      fromDate 
        ? await commentsForUrlSinceDate.run({ url, accountId: account.id, date: fromDate }, this.client)
        : await commentsForUrl.run({ url, accountId: account.id }, this.client)
      ).map(r => ({
      postUrl: r.page_url,
      postedAt: r.created_at,
      text: r.comment,
      author: {
        name: r.reader_name,
        email: r.reader_email ?? ''
      }
    }))
  }

}