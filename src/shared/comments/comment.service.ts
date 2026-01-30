import _ from 'lodash'
import moment from 'moment'
import { Account } from '../accounts/account.interface'
import { AccountService } from '../accounts/account.service'
import { AkismetService } from './akismet.service'
import { Comment, CommentBase, CommentWithId } from './comment.interface'
import { Inject, Injectable } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { v4 as uuidv4 } from 'uuid'
import { AuthorDto } from './author.interface'
import {
  COMMENT_REPOSITORY,
  ICommentRepository,
  CommentRecord,
} from '../repositories/comment.repository.interface'

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY) private commentRepo: ICommentRepository,
    private readonly accountService: AccountService,
    private readonly akismetService: AkismetService,
    private readonly logger: Logger
  ) {}

  async create(account: Account, comment: CommentBase, ip: string): Promise<CommentCreatedResult|string> {
    const settings = await this.accountService.settingsFor(account)
    const toModeration = settings?.requireModeration ?? false
    const payload = this.commentToDbParam(account, comment)
    if (toModeration || (settings?.akismetKey && settings.useAkismet)) {
      const flagIt = toModeration || (settings && (await this.akismetService.isCommentSpam(settings, comment, ip)))
      if (flagIt) {
        this.logger.warn(`${toModeration ? 'Moderation enforced' : 'SPAM detected'}: ${JSON.stringify(comment)}`)
        await this.commentRepo.createFlaggedComment(payload)
        return CommentCreatedResult.Flagged
      }
    }
    await this.commentRepo.createComment(payload)

    return payload.id
  }

  async createWithOption(account: Account, comment: CommentBase, toModeration: boolean): Promise<CommentCreatedResult> {
    const payload = { ...this.commentToDbParam(account, comment), createdAt: comment.postedAt }
    if (toModeration) {
      this.logger.warn(`Moderation enforced: ${JSON.stringify(comment)}`)
      await this.commentRepo.createFlaggedComment(payload)
      return CommentCreatedResult.Flagged
    }
    await this.commentRepo.createComment(payload)
    return CommentCreatedResult.Created
  }

  async commentsForUrl(account: Account, url: string, query?: CommentsQuery): Promise<CommentWithId[]> {
    let records: CommentRecord[]
    if (query?.fromDate) {
      records = await this.commentRepo.findForUrlSinceDate(account.id, url, query.fromDate)
    } else {
      records = await this.commentRepo.findForUrl(account.id, url)
      if (query?.afterId) {
        // records are sorted with the most recent coming up first
        // hopefully no two records have the exact same timestamp
        const lastKnownComment = records.find((r) => r.id === query.afterId)
        const indexOfLastComment = lastKnownComment ? records.indexOf(lastKnownComment) : -1
        records = indexOfLastComment === -1 ? records : records.slice(indexOfLastComment + 1)
      }
    }
    return records.map((r) => this.recordToClass(r))
  }

  async commentCountForAccount(account: Account): Promise<number> {
    return this.commentRepo.countForAccount(account.id)
  }

  async reviewCountForAccount(account: Account): Promise<number> {
    return this.commentRepo.countFlaggedForAccount(account.id)
  }

  async commentsForAccount(account: Account, sort?: SortOrder): Promise<CommentWithId[]> {
    const allComments = await this.commentRepo.findAllForAccount(account.id)
    const sorted = sort === SortOrder.Asc ? allComments.reverse() : allComments
    return sorted.map(this.recordToClass)
  }

  async commentsForAccountPaged(
    account: Account,
    sort: SortOrder,
    batchSize?: number,
    page?: number
  ): Promise<CommentWithId[]> {
    const limit = batchSize ?? 10
    const offset = ((page ?? 1) - 1) * limit
    const sortOrder = sort === SortOrder.Asc ? 'asc' : 'desc'
    const pagedComments = await this.commentRepo.findPagedForAccount(account.id, sortOrder, limit, offset)
    return pagedComments.map(this.recordToClass)
  }

  async reviewsForAccountPaged(
    account: Account,
    sort: SortOrder,
    batchSize?: number,
    page?: number
  ): Promise<CommentWithId[]> {
    const limit = batchSize ?? 10
    const offset = ((page ?? 1) - 1) * limit
    const sortOrder = sort === SortOrder.Asc ? 'asc' : 'desc'
    const pagedComments = await this.commentRepo.findPagedFlaggedForAccount(account.id, sortOrder, limit, offset)
    return pagedComments.map(this.recordToClass)
  }

  async findById(account: Account, id: string): Promise<Comment | undefined> {
    const record = await this.commentRepo.findById(account.id, id)
    if (!record) return undefined
    return _.merge(
      {
        id: record.id,
        account,
      },
      this.recordToClass(record)
    )
  }

  async findSpamById(account: Account, id: string): Promise<Comment | undefined> {
    const record = await this.commentRepo.findFlaggedById(account.id, id)
    if (!record) return undefined
    return _.merge(
      {
        id: record.id,
        account,
      },
      this.recordToClass(record)
    )
  }

  async deleteSingleById(commentId: string): Promise<void> {
    await this.commentRepo.deleteComment(commentId)
  }

  async deleteSingle(comment: Comment): Promise<void> {
    await this.commentRepo.deleteComment(comment.id)
  }

  async deleteSingleSpam(comment: Comment): Promise<void> {
    await this.commentRepo.deleteFlaggedComment(comment.id)
  }

  async markCommentNotSpam(comment: Comment): Promise<void> {
    const account = await this.accountService.findById(comment.account.id)
    if (!account) throw new Error('Data integrity error')
    await this.commentRepo.deleteFlaggedComment(comment.id)
    await this.commentRepo.createComment(
      _.merge({ createdAt: comment.postedAt }, this.commentToDbParam(account, comment))
    )
  }

  async purgeSpam(account: Account) {
    await this.commentRepo.deleteAllFlaggedForAccount(account.id)
  }

  async deleteContentsForAccount(account: Account): Promise<void> {
    await this.commentRepo.deleteAllForAccount(account.id)
    await this.commentRepo.deleteAllFlaggedForAccount(account.id)
  }

  async import(account: Account, dump: JsonDump[]): Promise<void> {
    await this.commentRepo.beginTransaction()
    try {
      for (const comment of dump) {
        await this.commentRepo.createComment({
          id: uuidv4(),
          accountId: account.id,
          createdAt: moment(comment.postedAt).utc(true).toDate(),
          url: comment.postUrl,
          pageTitle: comment.postTitle ?? null,
          text: comment.text,
          name: comment.author.name,
          email: comment.author.email,
          website: comment.author.website,
        })
      }
      await this.commentRepo.commitTransaction()
    } catch (error) {
      await this.commentRepo.rollbackTransaction()
      throw error
    }
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
      website: comment.author.website,
    }
  }

  private recordToClass(r: CommentRecord): CommentWithId {
    return {
      id: r.id,
      postUrl: r.page_url,
      postTitle: r.page_title || '',
      postedAt: moment(r.created_at).utc(true).toDate(),
      text: r.comment,
      author: {
        name: r.reader_name,
        email: r.reader_email ?? '',
        website: r.reader_website ?? '',
      },
    }
  }
}

export class CommentsQuery {
  fromDate?: Date
  afterId?: string
}

export interface JsonDump {
  postedAt: string
  postUrl: string
  postTitle?: string | null
  text: string
  author: AuthorDto
}

export enum SortOrder {
  Asc,
  Desc,
}

export enum CommentCreatedResult {
  Created,
  Flagged,
}
