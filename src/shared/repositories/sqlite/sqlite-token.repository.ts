import Database from 'better-sqlite3'
import { Inject, Injectable } from '@nestjs/common'
import { ITokenRepository, TokenRecord } from '../token.repository.interface'

@Injectable()
export class SqliteTokenRepository implements ITokenRepository {
  constructor(@Inject('SQLITE_DB') private db: Database.Database) {}

  async create(id: string, accountId: string, token: string, createdAt: Date): Promise<void> {
    const stmt = this.db.prepare(`
      INSERT INTO tokens (id, account_id, token, created_at)
      VALUES (?, ?, ?, ?)
    `)
    stmt.run(id, accountId, token, createdAt.toISOString())
  }

  async findByToken(token: string): Promise<TokenRecord | undefined> {
    const stmt = this.db.prepare('SELECT * FROM tokens WHERE token = ?')
    const row = stmt.get(token) as SqliteTokenRow | undefined
    return row ? this.toRecord(row) : undefined
  }

  async findCurrentToken(accountId: string): Promise<TokenRecord | undefined> {
    const stmt = this.db.prepare(`
      SELECT * FROM tokens
      WHERE account_id = ? AND revoked_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1
    `)
    const row = stmt.get(accountId) as SqliteTokenRow | undefined
    return row ? this.toRecord(row) : undefined
  }

  async findAllValidTokens(accountId: string): Promise<TokenRecord[]> {
    const stmt = this.db.prepare(`
      SELECT * FROM tokens
      WHERE account_id = ? AND revoked_at IS NULL
      ORDER BY created_at DESC
    `)
    const rows = stmt.all(accountId) as SqliteTokenRow[]
    return rows.map(this.toRecord)
  }

  async revoke(token: string, revokedAt: Date): Promise<void> {
    const stmt = this.db.prepare('UPDATE tokens SET revoked_at = ? WHERE token = ?')
    stmt.run(revokedAt.toISOString(), token)
  }

  async deleteForAccount(accountId: string): Promise<void> {
    const stmt = this.db.prepare('DELETE FROM tokens WHERE account_id = ?')
    stmt.run(accountId)
  }

  private toRecord(row: SqliteTokenRow): TokenRecord {
    return {
      id: row.id,
      account_id: row.account_id,
      token: row.token,
      created_at: new Date(row.created_at),
      revoked_at: row.revoked_at ? new Date(row.revoked_at) : null,
    }
  }
}

interface SqliteTokenRow {
  id: string
  account_id: string
  token: string
  created_at: string
  revoked_at: string | null
}
