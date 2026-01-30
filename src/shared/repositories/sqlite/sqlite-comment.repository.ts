import Database from 'better-sqlite3'
import { Inject, Injectable } from '@nestjs/common'
import {
  ICommentRepository,
  CommentRecord,
  CreateCommentParams,
  CommentSortOrder,
} from '../comment.repository.interface'

@Injectable()
export class SqliteCommentRepository implements ICommentRepository {
  constructor(@Inject('SQLITE_DB') private db: Database.Database) {}

  async createComment(params: CreateCommentParams): Promise<void> {
    const stmt = this.db.prepare(`
      INSERT INTO comments (id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const createdAt = params.createdAt
      ? params.createdAt.toISOString()
      : new Date().toISOString()
    stmt.run(
      params.id,
      params.accountId,
      params.url,
      params.pageTitle,
      params.text,
      params.name,
      params.email,
      params.website,
      createdAt
    )
  }

  async createFlaggedComment(params: CreateCommentParams): Promise<void> {
    const stmt = this.db.prepare(`
      INSERT INTO reviews (id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const createdAt = params.createdAt
      ? params.createdAt.toISOString()
      : new Date().toISOString()
    stmt.run(
      params.id,
      params.accountId,
      params.url,
      params.pageTitle,
      params.text,
      params.name,
      params.email,
      params.website,
      createdAt
    )
  }

  async countForAccount(accountId: string): Promise<number> {
    const stmt = this.db.prepare('SELECT COUNT(*) as total FROM comments WHERE account_id = ?')
    const row = stmt.get(accountId) as { total: number }
    return row.total
  }

  async countFlaggedForAccount(accountId: string): Promise<number> {
    const stmt = this.db.prepare('SELECT COUNT(*) as total FROM reviews WHERE account_id = ?')
    const row = stmt.get(accountId) as { total: number }
    return row.total
  }

  async findAllForAccount(accountId: string): Promise<CommentRecord[]> {
    const stmt = this.db.prepare(`
      SELECT * FROM comments
      WHERE account_id = ?
      ORDER BY created_at DESC
    `)
    const rows = stmt.all(accountId) as SqliteCommentRow[]
    return rows.map(this.toRecord)
  }

  async findPagedForAccount(
    accountId: string,
    sort: CommentSortOrder,
    limit: number,
    offset: number
  ): Promise<CommentRecord[]> {
    const orderDir = sort === 'asc' ? 'ASC' : 'DESC'
    const stmt = this.db.prepare(`
      SELECT * FROM comments
      WHERE account_id = ?
      ORDER BY created_at ${orderDir}
      LIMIT ? OFFSET ?
    `)
    const rows = stmt.all(accountId, limit, offset) as SqliteCommentRow[]
    return rows.map(this.toRecord)
  }

  async findPagedFlaggedForAccount(
    accountId: string,
    sort: CommentSortOrder,
    limit: number,
    offset: number
  ): Promise<CommentRecord[]> {
    const orderDir = sort === 'asc' ? 'ASC' : 'DESC'
    const stmt = this.db.prepare(`
      SELECT * FROM reviews
      WHERE account_id = ?
      ORDER BY created_at ${orderDir}
      LIMIT ? OFFSET ?
    `)
    const rows = stmt.all(accountId, limit, offset) as SqliteCommentRow[]
    return rows.map(this.toRecord)
  }

  async findForUrl(accountId: string, url: string): Promise<CommentRecord[]> {
    const stmt = this.db.prepare(`
      SELECT * FROM comments
      WHERE account_id = ? AND page_url = ?
      ORDER BY created_at ASC
    `)
    const rows = stmt.all(accountId, url) as SqliteCommentRow[]
    return rows.map(this.toRecord)
  }

  async findForUrlSinceDate(accountId: string, url: string, date: Date): Promise<CommentRecord[]> {
    const stmt = this.db.prepare(`
      SELECT * FROM comments
      WHERE account_id = ? AND page_url = ? AND created_at > ?
      ORDER BY created_at ASC
    `)
    const rows = stmt.all(accountId, url, date.toISOString()) as SqliteCommentRow[]
    return rows.map(this.toRecord)
  }

  async findById(accountId: string, id: string): Promise<CommentRecord | undefined> {
    const stmt = this.db.prepare('SELECT * FROM comments WHERE account_id = ? AND id = ?')
    const row = stmt.get(accountId, id) as SqliteCommentRow | undefined
    return row ? this.toRecord(row) : undefined
  }

  async findFlaggedById(accountId: string, id: string): Promise<CommentRecord | undefined> {
    const stmt = this.db.prepare('SELECT * FROM reviews WHERE account_id = ? AND id = ?')
    const row = stmt.get(accountId, id) as SqliteCommentRow | undefined
    return row ? this.toRecord(row) : undefined
  }

  async deleteComment(id: string): Promise<void> {
    const stmt = this.db.prepare('DELETE FROM comments WHERE id = ?')
    stmt.run(id)
  }

  async deleteFlaggedComment(id: string): Promise<void> {
    const stmt = this.db.prepare('DELETE FROM reviews WHERE id = ?')
    stmt.run(id)
  }

  async deleteAllForAccount(accountId: string): Promise<void> {
    const stmt = this.db.prepare('DELETE FROM comments WHERE account_id = ?')
    stmt.run(accountId)
  }

  async deleteAllFlaggedForAccount(accountId: string): Promise<void> {
    const stmt = this.db.prepare('DELETE FROM reviews WHERE account_id = ?')
    stmt.run(accountId)
  }

  async beginTransaction(): Promise<void> {
    this.db.exec('BEGIN TRANSACTION')
  }

  async commitTransaction(): Promise<void> {
    this.db.exec('COMMIT')
  }

  async rollbackTransaction(): Promise<void> {
    this.db.exec('ROLLBACK')
  }

  private toRecord(row: SqliteCommentRow): CommentRecord {
    return {
      id: row.id,
      account_id: row.account_id,
      page_url: row.page_url,
      page_title: row.page_title,
      comment: row.comment,
      reader_name: row.reader_name,
      reader_email: row.reader_email,
      reader_website: row.reader_website,
      created_at: new Date(row.created_at),
    }
  }
}

interface SqliteCommentRow {
  id: string
  account_id: string
  page_url: string
  page_title: string | null
  comment: string
  reader_name: string
  reader_email: string | null
  reader_website: string | null
  created_at: string
}
