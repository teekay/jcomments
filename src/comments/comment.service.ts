import _ from 'lodash'
import { Account } from '../accounts/account.interface'
import { AccountService } from '../accounts/account.service'
import { AkismetService } from './akismet.service'
import { Client } from 'pg'
import { Comment, CommentBase, CommentWithId } from './comment.interface'
import { commentsForAccount, commentCountForAccount, commentsForUrl, commentsForUrlSinceDate, ICommentsForAccountResult, postCommentForUrl, commentsForAccountPaged, findByIdForAccount, flagCommentForUrl, reviewCountForAccount, reviewsForAccountPaged, deleteSingleComment, deleteSingleSpam, postCommentForUrlWithTimestamp, findSpamByIdForAccount, ICommentsForUrlSinceDateResult, ICommentsForUrlResult } from './comments.queries'
import { Inject, Injectable } from '@nestjs/common'
import { Logger } from "nestjs-pino";
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

@Injectable()
export class CommentService {
  constructor(@Inject('PG_CLIENT') private client: Client,
    private readonly accountService: AccountService,
    private readonly akismetService: AkismetService,
    private readonly logger: Logger) {}

  async create(account: Account, comment: CommentBase, ip: string): Promise<void> {
    const settings = await this.accountService.settingsFor(account)
    if (settings?.akismetKey && settings.useAkismet) {
      const isSpam = await this.akismetService.isCommentSpam(settings, comment, ip)
      if (isSpam) {
        this.logger.warn(`SPAM detected: ${JSON.stringify(comment)}`)
        await flagCommentForUrl.run(this.commentToDbParam(account, comment), this.client)
        return
      }
    }
    await postCommentForUrl.run(this.commentToDbParam(account, comment), this.client)
  }

  async commentsForUrl(account: Account, url: string, query?: CommentsQuery): Promise<CommentWithId[]> {
    let records: ICommentsForUrlSinceDateResult[] | ICommentsForUrlResult[]
    if (query?.fromDate) {
      records = await commentsForUrlSinceDate.run({ url, accountId: account.id, date: query.fromDate }, this.client)
    } else {
      records = await commentsForUrl.run({ url, accountId: account.id }, this.client)
      if (query?.afterId) {
        // records are sorted with the most recent coming up first
        // hopefully no two records have the exact same timestamp
        const lastKnownComment = records.find(r => r.id === query.afterId)
        const indexOfLastComment = lastKnownComment ? records.indexOf(lastKnownComment) : -1
        records = indexOfLastComment === -1 ? records : records.slice(indexOfLastComment + 1)
      }
    }
    return records.map(r => this.recordToClass(r))
  }

  async commentCountForAccount(account: Account): Promise<number> {
    const c = await commentCountForAccount.run({ accountId: account.id }, this.client)
    return +(c[0].Total ?? 0)
  }

  async reviewCountForAccount(account: Account): Promise<number> {
    const c = await reviewCountForAccount.run({ accountId: account.id }, this.client)
    return +(c[0].Total ?? 0)
  }

  async commentsForAccount(account: Account): Promise<CommentWithId[]> {
      const allComments = await commentsForAccount.run({ accountId: account.id }, this.client)
      return allComments.map(this.recordToClass)
  }

  async commentsForAccountPaged(account: Account, batchSize?: number, page?: number): Promise<CommentWithId[]> {
    const limit = batchSize ?? 10
    const offset = ((page ?? 1) - 1) * limit
    const pagedComments = await commentsForAccountPaged.run({ accountId: account.id, limit: `${limit}`, offset: `${offset}` }, this.client)
    return pagedComments.map(this.recordToClass)
  }

  async reviewsForAccountPaged(account: Account, batchSize?: number, page?: number): Promise<CommentWithId[]> {
    const limit = batchSize ?? 10
    const offset = ((page ?? 1) - 1) * limit
    const pagedComments = await reviewsForAccountPaged.run({ accountId: account.id, limit: `${limit}`, offset: `${offset}` }, this.client)
    return pagedComments.map(this.recordToClass)
  }

  async findById(account: Account, id: string): Promise<Comment | undefined> {
    const c = await findByIdForAccount.run({accountId: account.id, id}, this.client)
    if (c.length !== 1) return
    return _.merge({
      id: c[0].id, account
    }, this.recordToClass(c[0] as ICommentsForAccountResult))
  }

  async findSpamById(account: Account, id: string): Promise<Comment | undefined> {
    const c = await findSpamByIdForAccount.run({accountId: account.id, id}, this.client)
    if (c.length !== 1) return
    return _.merge({
      id: c[0].id, account
    }, this.recordToClass(c[0] as ICommentsForAccountResult))
  }

  async deleteSingle(comment: Comment): Promise<void> {
    await deleteSingleComment.run({id: comment.id}, this.client)
  }

  async deleteSingleSpam(comment: Comment): Promise<void> {
    await deleteSingleSpam.run({id: comment.id}, this.client)
  }

  async markCommentNotSpam(comment: Comment): Promise<void> {
    const account = await this.accountService.findById(comment.account.id)
    if (!account) throw new Error("Data integrity error")
    await deleteSingleSpam.run({id: comment.id}, this.client)
    await postCommentForUrlWithTimestamp.run(_.merge(
      {createdAt: comment.postedAt},
      this.commentToDbParam(account, comment)), this.client)
  }

  async import(account: Account, dump: JsonDump[]): Promise<void> {
    await this.client.query("BEGIN;")
    for (const comment of dump) {
      await postCommentForUrlWithTimestamp.run({
        id: uuidv4(),
        accountId: account.id,
        createdAt: moment(comment.posted_at).toDate(),
        url: comment.page_url,
        text: comment.text,
        name: comment.author,
        email: comment.email,
        website: comment.website
      }, this.client)
    }
    await this.client.query("COMMIT;")
  }

  private commentToDbParam(account: Account, comment: CommentBase) {
    return {
      id: uuidv4(),
      accountId: account.id,
      url: comment.postUrl,
      text: comment.text,
      name: comment.author.name,
      email: comment.author.email,
      website: comment.author.website
    }
  }

  private recordToClass(r: ICommentsForAccountResult): CommentWithId {
    return {
      id: r.id,
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

export class CommentsQuery {
  fromDate?: Date;
  afterId?: string;
}

export interface JsonDump {
  posted_at: string
  page_url: string
  author: string
  text: string
  email?: string
  website?: string
}