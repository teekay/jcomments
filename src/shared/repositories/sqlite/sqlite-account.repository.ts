import Database from 'better-sqlite3'
import { Inject, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import {
  IAccountRepository,
  AccountRecord,
} from '../account.repository.interface'
import { EmailSettingsParam, SettingsParam } from '../../accounts/settings.param'

@Injectable()
export class SqliteAccountRepository implements IAccountRepository {
  constructor(@Inject('SQLITE_DB') private db: Database.Database) {}

  async create(
    id: string,
    username: string,
    email: string,
    passwordHash: string,
    createdAt: Date
  ): Promise<void> {
    const stmt = this.db.prepare(`
      INSERT INTO accounts (id, username, email, password, created_at)
      VALUES (?, ?, ?, ?, ?)
    `)
    stmt.run(id, username, email, passwordHash, createdAt.toISOString())

    const settingsStmt = this.db.prepare(`
      INSERT INTO account_settings (id, account_id)
      VALUES (?, ?)
    `)
    settingsStmt.run(uuidv4(), id)

    const emailSettingsStmt = this.db.prepare(`
      INSERT INTO account_email_settings (id, account_id)
      VALUES (?, ?)
    `)
    emailSettingsStmt.run(uuidv4(), id)
  }

  async findById(id: string): Promise<AccountRecord | undefined> {
    const stmt = this.db.prepare('SELECT * FROM accounts WHERE id = ?')
    const row = stmt.get(id) as SqliteAccountRow | undefined
    return row ? this.toRecord(row) : undefined
  }

  async findByUsername(username: string): Promise<AccountRecord | undefined> {
    const stmt = this.db.prepare('SELECT * FROM accounts WHERE username = ?')
    const row = stmt.get(username) as SqliteAccountRow | undefined
    return row ? this.toRecord(row) : undefined
  }

  async findByEmail(email: string): Promise<AccountRecord | undefined> {
    const stmt = this.db.prepare('SELECT * FROM accounts WHERE email = ?')
    const row = stmt.get(email) as SqliteAccountRow | undefined
    return row ? this.toRecord(row) : undefined
  }

  async findByUsernameOrEmail(username: string, email: string): Promise<AccountRecord | undefined> {
    const stmt = this.db.prepare('SELECT * FROM accounts WHERE username = ? OR email = ?')
    const row = stmt.get(username, email) as SqliteAccountRow | undefined
    return row ? this.toRecord(row) : undefined
  }

  async updatePassword(accountId: string, passwordHash: string): Promise<void> {
    const stmt = this.db.prepare('UPDATE accounts SET password = ? WHERE id = ?')
    stmt.run(passwordHash, accountId)
  }

  async changeEmail(accountId: string, email: string): Promise<void> {
    const stmt = this.db.prepare('UPDATE accounts SET email = ? WHERE id = ?')
    stmt.run(email, accountId)
  }

  async getSettings(accountId: string): Promise<SettingsParam | undefined> {
    const stmt = this.db.prepare('SELECT * FROM account_settings WHERE account_id = ?')
    const row = stmt.get(accountId) as SqliteSettingsRow | undefined
    if (!row) return undefined
    return {
      requireModeration: Boolean(row.require_moderation),
      useAkismet: Boolean(row.use_akismet),
      akismetKey: row.akismet_key ?? '',
      blogUrl: row.blog_url ?? '',
      useLlmCheck: Boolean(row.use_llm_check),
      llmApiKey: row.llm_api_key ?? '',
      llmConfidenceThreshold: row.llm_confidence_threshold ?? 0.8,
    }
  }

  async getEmailSettings(accountId: string): Promise<EmailSettingsParam | undefined> {
    const stmt = this.db.prepare('SELECT * FROM account_email_settings WHERE account_id = ?')
    const row = stmt.get(accountId) as SqliteEmailSettingsRow | undefined
    if (!row) return undefined
    return {
      notifyOnComments: Boolean(row.notify_on_comments),
      sendCommentsDigest: Boolean(row.send_comments_digest),
    }
  }

  async updateSettings(accountId: string, settings: SettingsParam): Promise<void> {
    const stmt = this.db.prepare(`
      UPDATE account_settings
      SET require_moderation = ?, blog_url = ?, use_akismet = ?, akismet_key = ?,
          use_llm_check = ?, llm_api_key = ?, llm_confidence_threshold = ?
      WHERE account_id = ?
    `)
    stmt.run(
      settings.requireModeration ? 1 : 0,
      settings.blogUrl,
      settings.useAkismet ? 1 : 0,
      settings.akismetKey,
      settings.useLlmCheck ? 1 : 0,
      settings.llmApiKey,
      settings.llmConfidenceThreshold ?? 0.8,
      accountId
    )
  }

  async updateEmailSettings(accountId: string, settings: EmailSettingsParam): Promise<void> {
    const stmt = this.db.prepare(`
      UPDATE account_email_settings
      SET notify_on_comments = ?, send_comments_digest = ?
      WHERE account_id = ?
    `)
    stmt.run(
      settings.notifyOnComments ? 1 : 0,
      settings.sendCommentsDigest ? 1 : 0,
      accountId
    )
  }

  async closeAccount(accountId: string): Promise<void> {
    const deleteAccount = this.db.transaction((id: string) => {
      this.db.prepare('DELETE FROM account_settings WHERE account_id = ?').run(id)
      this.db.prepare('DELETE FROM account_email_settings WHERE account_id = ?').run(id)
      this.db.prepare('DELETE FROM tokens WHERE account_id = ?').run(id)
      this.db.prepare('DELETE FROM accounts WHERE id = ?').run(id)
    })
    deleteAccount(accountId)
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

interface SqliteSettingsRow {
  id: string
  account_id: string
  blog_url: string | null
  akismet_key: string | null
  use_akismet: number | null
  require_moderation: number
  use_llm_check: number | null
  llm_api_key: string | null
  llm_confidence_threshold: number | null
}

interface SqliteEmailSettingsRow {
  id: string
  account_id: string
  notify_on_comments: number | null
  send_comments_digest: number | null
}
