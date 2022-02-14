import _ from 'lodash'
import { Account } from '../accounts/account.interface'
import { AccountService } from '../accounts/account.service'
import { AkismetService } from './akismet.service'
import { Client } from 'pg'
import { Comment, CommentBase, CommentWithId } from './comment.interface'
import { commentsForAccount, commentCountForAccount, commentsForUrl, commentsForUrlSinceDate, ICommentsForAccountResult, postCommentForUrl, commentsForAccountPaged, findByIdForAccount, flagCommentForUrl, reviewCountForAccount, reviewsForAccountPaged, deleteSingleComment, deleteSingleSpam, postCommentForUrlWithTimestamp, findSpamByIdForAccount, ICommentsForUrlSinceDateResult, ICommentsForUrlResult, deleteAllComments, deleteAllSpam, flagCommentForUrlWithTimestamp } from './comments.queries'
import { Inject, Injectable } from '@nestjs/common'
import { Logger } from "nestjs-pino";
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { interpretedQuery } from '../logging/logged-query'

@Injectable()
export class CommentService {
  constructor(@Inject('PG_CLIENT') private client: Client,
    private readonly accountService: AccountService,
    private readonly akismetService: AkismetService,
    private readonly logger: Logger) {}

  async create(account: Account, comment: CommentBase, ip: string): Promise<CommentCreatedResult> {
    const settings = await this.accountService.settingsFor(account)
    const toModeration = (settings?.requireModeration ?? false)
    if (toModeration || (settings?.akismetKey && settings.useAkismet)) {
      const flagIt = toModeration || (settings && await this.akismetService.isCommentSpam(settings, comment, ip))
      if (flagIt) {
        this.logger.warn(`${toModeration ? 'Moderation enforced':'SPAM detected'}: ${JSON.stringify(comment)}`)
        await flagCommentForUrl.run(this.commentToDbParam(account, comment), this.client)
        return CommentCreatedResult.Flagged
      }
    }
    await postCommentForUrl.run(this.commentToDbParam(account, comment), this.client)
    return CommentCreatedResult.Created
  }

  async createWithOption(account: Account, comment: CommentBase, toModeration: boolean): Promise<CommentCreatedResult> {
    if (toModeration) {
      this.logger.warn(`Moderation enforced: ${JSON.stringify(comment)}`)
      await flagCommentForUrlWithTimestamp.run({...this.commentToDbParam(account, comment), createdAt: comment.postedAt}, this.client)
      return CommentCreatedResult.Flagged
    }
    await postCommentForUrlWithTimestamp.run({...this.commentToDbParam(account, comment), createdAt: comment.postedAt}, this.client)
    return CommentCreatedResult.Created
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

  async commentsForAccount(account: Account, sort?: SortOrder): Promise<CommentWithId[]> {
      const allComments = await commentsForAccount.run({ accountId: account.id }, this.client)
      const sorted = sort === SortOrder.Asc ? allComments.reverse() : allComments
      return sorted.map(this.recordToClass)
  }

  async commentsForAccountPaged(account: Account, batchSize?: number, page?: number): Promise<CommentWithId[]> {
    const limit = batchSize ?? 10
    const offset = ((page ?? 1) - 1) * limit
    const params = { accountId: account.id, limit: `${limit}`, offset: `${offset}` }
    const pagedComments = await commentsForAccountPaged.run(params, this.client)
    this.logger.debug(interpretedQuery(commentsForAccountPaged, params))
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

  async deleteContentsForAccount(account: Account): Promise<void> {
    await deleteAllComments.run({ accountId: account.id }, this.client)
    await deleteAllSpam.run({ accountId: account.id }, this.client)
  }

  async import(account: Account, dump: JsonDump[]): Promise<void> {
    await this.client.query("BEGIN;")
    for (const comment of dump) {
      await postCommentForUrlWithTimestamp.run({
        id: uuidv4(),
        accountId: account.id,
        createdAt: moment(comment.posted_at).utc(true).toDate(),
        url: comment.page_url,
        pageTitle: comment.page_title ?? null,
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
      pageTitle: comment.postTitle ?? null,
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
      postTitle: r.page_title|| '',
      postedAt: moment(r.created_at).utc(true).toDate(),
      text: r.comment,
      author: {
        name: r.reader_name,
        email: r.reader_email ?? '',
        website: r.reader_website ?? ''
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
  page_title?: string | null
  author: string
  text: string
  email?: string
  website?: string
}

export enum SortOrder {
  Asc, Desc
}

export enum CommentCreatedResult {
  Created, Flagged
}