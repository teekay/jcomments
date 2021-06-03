import { Account } from '../accounts/account.interface'
import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import { Comment, CommentBase } from './comment.interface'
import { commentsForAccount, commentCountForAccount, commentsForUrl, commentsForUrlSinceDate, ICommentsForAccountResult, postCommentForUrl, commentsForAccountPaged } from './comments.queries'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from "nestjs-pino";

@Injectable()
export class CommentService {
  constructor(@Inject('PG_CLIENT') private client: Client,
    private readonly logger: Logger) {}

  async create(account: Account, comment: Comment): Promise<void> {
    this.logger.log(`Creating a comment ${JSON.stringify(comment)}`)
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
      ).map(r => this.recordToClass(r))
  }

  async commentCountForAccount(account: Account): Promise<number> {
    const c = await commentCountForAccount.run({ accountId: account.id }, this.client)
    return +(c[0].Total ?? 0)
  }

  async commentsForAccount(account: Account) {
      const allComments = await commentsForAccount.run({ accountId: account.id }, this.client)
      return allComments.map(this.recordToClass)
  }

  async commentsForAccountPaged(account: Account, batchSize?: number, page?: number) {
    const limit = batchSize ?? 10
    const offset = ((page ?? 1) - 1) * limit
    const pagedComments = await commentsForAccountPaged.run({ accountId: account.id, limit: `${limit}`, offset: `${offset}` }, this.client)
    return pagedComments.map(this.recordToClass)
  }

  private recordToClass(r: ICommentsForAccountResult): CommentBase {
    return {
      postUrl: r.page_url,
      postedAt: r.created_at,
      text: r.comment,
      author: {
        name: r.reader_name,
        email: r.reader_email ?? ''
      }
    }
  }
}