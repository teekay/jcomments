import { Client } from 'pg'
import { Inject, Injectable } from '@nestjs/common'
import {
  ICommentRepository,
  CommentRecord,
  CreateCommentParams,
  CommentSortOrder,
} from '../comment.repository.interface'
import {
  postCommentForUrl,
  postCommentForUrlWithTimestamp,
  flagCommentForUrl,
  flagCommentForUrlWithTimestamp,
  commentCountForAccount,
  reviewCountForAccount,
  commentsForAccount,
  commentsForAccountPaged,
  reviewsForAccountPaged,
  commentsForUrl,
  commentsForUrlSinceDate,
  findByIdForAccount,
  findSpamByIdForAccount,
  deleteSingleComment,
  deleteSingleSpam,
  deleteAllComments,
  deleteAllSpam,
} from '../../comments/comments.queries'

@Injectable()
export class PostgresCommentRepository implements ICommentRepository {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async createComment(params: CreateCommentParams): Promise<void> {
    const dbParams = {
      id: params.id,
      accountId: params.accountId,
      url: params.url,
      pageTitle: params.pageTitle,
      text: params.text,
      name: params.name,
      email: params.email ?? null,
      website: params.website ?? null,
    }
    if (params.createdAt) {
      await postCommentForUrlWithTimestamp.run(
        { ...dbParams, createdAt: params.createdAt },
        this.client
      )
    } else {
      await postCommentForUrl.run(dbParams, this.client)
    }
  }

  async createFlaggedComment(params: CreateCommentParams): Promise<void> {
    const dbParams = {
      id: params.id,
      accountId: params.accountId,
      url: params.url,
      pageTitle: params.pageTitle,
      text: params.text,
      name: params.name,
      email: params.email ?? null,
      website: params.website ?? null,
    }
    if (params.createdAt) {
      await flagCommentForUrlWithTimestamp.run(
        { ...dbParams, createdAt: params.createdAt },
        this.client
      )
    } else {
      await flagCommentForUrl.run(dbParams, this.client)
    }
  }

  async countForAccount(accountId: string): Promise<number> {
    const c = await commentCountForAccount.run({ accountId }, this.client)
    return +(c[0].Total ?? 0)
  }

  async countFlaggedForAccount(accountId: string): Promise<number> {
    const c = await reviewCountForAccount.run({ accountId }, this.client)
    return +(c[0].Total ?? 0)
  }

  async findAllForAccount(accountId: string): Promise<CommentRecord[]> {
    const comments = await commentsForAccount.run({ accountId }, this.client)
    return comments.map(this.toRecord)
  }

  async findPagedForAccount(
    accountId: string,
    sort: CommentSortOrder,
    limit: number,
    offset: number
  ): Promise<CommentRecord[]> {
    const comments = await commentsForAccountPaged.run(
      { accountId, limit: `${limit}`, offset: `${offset}`, asc: sort === 'asc' },
      this.client
    )
    return comments.map(this.toRecord)
  }

  async findPagedFlaggedForAccount(
    accountId: string,
    sort: CommentSortOrder,
    limit: number,
    offset: number
  ): Promise<CommentRecord[]> {
    const comments = await reviewsForAccountPaged.run(
      { accountId, limit: `${limit}`, offset: `${offset}`, asc: sort === 'asc' },
      this.client
    )
    return comments.map(this.toRecord)
  }

  async findForUrl(accountId: string, url: string): Promise<CommentRecord[]> {
    const comments = await commentsForUrl.run({ accountId, url }, this.client)
    return comments.map(this.toRecord)
  }

  async findForUrlSinceDate(accountId: string, url: string, date: Date): Promise<CommentRecord[]> {
    const comments = await commentsForUrlSinceDate.run({ accountId, url, date }, this.client)
    return comments.map(this.toRecord)
  }

  async findById(accountId: string, id: string): Promise<CommentRecord | undefined> {
    const c = await findByIdForAccount.run({ accountId, id }, this.client)
    if (c.length !== 1) return undefined
    return this.toRecord(c[0])
  }

  async findFlaggedById(accountId: string, id: string): Promise<CommentRecord | undefined> {
    const c = await findSpamByIdForAccount.run({ accountId, id }, this.client)
    if (c.length !== 1) return undefined
    return this.toRecord(c[0])
  }

  async deleteComment(id: string): Promise<void> {
    await deleteSingleComment.run({ id }, this.client)
  }

  async deleteFlaggedComment(id: string): Promise<void> {
    await deleteSingleSpam.run({ id }, this.client)
  }

  async deleteAllForAccount(accountId: string): Promise<void> {
    await deleteAllComments.run({ accountId }, this.client)
  }

  async deleteAllFlaggedForAccount(accountId: string): Promise<void> {
    await deleteAllSpam.run({ accountId }, this.client)
  }

  async beginTransaction(): Promise<void> {
    await this.client.query('BEGIN;')
  }

  async commitTransaction(): Promise<void> {
    await this.client.query('COMMIT;')
  }

  async rollbackTransaction(): Promise<void> {
    await this.client.query('ROLLBACK;')
  }

  private toRecord(row: {
    id: string
    account_id: string
    page_url: string
    page_title: string | null
    comment: string
    reader_name: string
    reader_email: string | null
    reader_website: string | null
    created_at: Date
  }): CommentRecord {
    return {
      id: row.id,
      account_id: row.account_id,
      page_url: row.page_url,
      page_title: row.page_title,
      comment: row.comment,
      reader_name: row.reader_name,
      reader_email: row.reader_email,
      reader_website: row.reader_website,
      created_at: row.created_at,
    }
  }
}
