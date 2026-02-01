import Database from 'better-sqlite3'
import { Inject, Injectable } from '@nestjs/common'
import { IAuthRepository } from '../auth.repository.interface'
import { AccountRecord } from '../account.repository.interface'

@Injectable()
export class SqliteAuthRepository implements IAuthRepository {
  constructor(@Inject('SQLITE_DB') private db: Database.Database) {}

  async expirePendingTokens(accountId: string, now: Date): Promise<void> {
    const stmt = this.db.prepare(`
      UPDATE password_resets
      SET used_at = ?
      WHERE account_id = ? AND used_at IS NULL
    `)
    stmt.run(now.toISOString(), accountId)
  }

  async createPasswordResetToken(
    id: string,
    accountId: string,
    token: string,
    createdAt: Date,
    expiresAt: Date
  ): Promise<void> {
    const stmt = this.db.prepare(`
      INSERT INTO password_resets (id, account_id, token, created_at, expires_at)
      VALUES (?, ?, ?, ?, ?)
    `)
    stmt.run(id, accountId, token, createdAt.toISOString(), expiresAt.toISOString())
  }

  async isTokenUsable(token: string, date: Date): Promise<boolean> {
    const stmt = this.db.prepare(`
      SELECT * FROM password_resets
      WHERE token = ? AND used_at IS NULL AND expires_at > ?
    `)
    const row = stmt.get(token, date.toISOString())
    return !!row
  }

  async accountFromToken(token: string): Promise<AccountRecord | undefined> {
    const stmt = this.db.prepare(`
      SELECT a.* FROM accounts a
      JOIN password_resets p ON a.id = p.account_id
      WHERE p.token = ?
    `)
    const row = stmt.get(token) as SqliteAccountRow | undefined
    return row ? this.toRecord(row) : undefined
  }

  async accountFromLoginToken(token: string): Promise<AccountRecord | undefined> {
    const stmt = this.db.prepare(`
      SELECT DISTINCT a.* FROM accounts a
      JOIN tokens t ON a.id = t.account_id
      WHERE t.token = ? AND t.revoked_at IS NULL
    `)
    const row = stmt.get(token) as SqliteAccountRow | undefined
    return row ? this.toRecord(row) : undefined
  }

  private toRecord(row: SqliteAccountRow): AccountRecord {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      password: row.password,
      created_at: new Date(row.created_at),
    }
  }
}

interface SqliteAccountRow {
  id: string
  username: string
  email: string
  password: string
  created_at: string
}
