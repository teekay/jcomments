import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { appContext } from '../src/azure'
import { Client } from 'pg'
import Database from 'better-sqlite3'
import * as fs from 'fs'
import * as path from 'path'
import { AccountRecord } from '../src/shared/repositories/account.repository.interface'
import { CommentRecord } from '../src/shared/repositories/comment.repository.interface'
import { TokenRecord } from '../src/shared/repositories/token.repository.interface'
import { PasswordResetRecord } from '../src/shared/repositories/auth.repository.interface'
import {
  IAccountSettingsResult,
  IAccountEmailSettingsResult,
} from '../src/shared/accounts/accounts.queries'

interface MigrationResult {
  success: boolean
  counts: Record<string, number>
  duration: number
  error?: string
}

const migrationRun: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('JamComments - Running PostgreSQL to SQLite migration')

  const startTime = Date.now()
  const counts: Record<string, number> = {}

  try {
    // Get Postgres client from app context
    const app = await appContext()
    const pgClient: Client = await app.get('PG_CLIENT')

    // Get SQLite path from env
    const sqlitePath = process.env.SQLITE_PATH
    if (!sqlitePath) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: { success: false, error: 'SQLITE_PATH environment variable not set' },
      }
      return
    }

    context.log(`Migration target: ${sqlitePath}`)

    // Ensure directory exists
    const outputDir = path.dirname(sqlitePath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
      context.log(`Created directory: ${outputDir}`)
    }

    // Remove existing SQLite file if present
    if (fs.existsSync(sqlitePath)) {
      fs.unlinkSync(sqlitePath)
      context.log('Removed existing SQLite database')
    }

    // Create SQLite database
    const sqliteDb = new Database(sqlitePath)
    sqliteDb.pragma('journal_mode = WAL')
    sqliteDb.pragma('foreign_keys = OFF')

    // Load and execute schema
    const schemaPath = path.join(__dirname, '..', 'sql', 'sqlite', 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf-8')
    sqliteDb.exec(schema)
    context.log('Schema created')

    // Start transaction
    sqliteDb.exec('BEGIN TRANSACTION')

    try {
      // Helper functions
      const toISOString = (date: Date | null): string | null =>
        date ? date.toISOString() : null

      const toInt = (bool: boolean | null): number | null =>
        bool === null ? null : bool ? 1 : 0

      // Migrate accounts
      context.log('Migrating accounts...')
      const accounts = await pgClient.query<AccountRecord>('SELECT * FROM accounts')
      const insertAccount = sqliteDb.prepare(`
        INSERT INTO accounts (id, username, email, password, created_at)
        VALUES (?, ?, ?, ?, ?)
      `)
      for (const row of accounts.rows) {
        let passwordStr: string
        if (Buffer.isBuffer(row.password)) {
          const asUtf8 = row.password.toString('utf8')
          if (asUtf8.startsWith('$2')) {
            passwordStr = asUtf8
          } else {
            passwordStr = row.password.toString('hex')
          }
        } else {
          passwordStr = row.password as unknown as string
        }
        insertAccount.run(
          row.id,
          row.username,
          row.email,
          passwordStr,
          toISOString(row.created_at)
        )
      }
      counts.accounts = accounts.rows.length
      context.log(`Migrated ${counts.accounts} accounts`)

      // Migrate account_settings
      context.log('Migrating account_settings...')
      const settings = await pgClient.query<IAccountSettingsResult>('SELECT * FROM account_settings')
      const insertSettings = sqliteDb.prepare(`
        INSERT INTO account_settings (id, account_id, blog_url, akismet_key, use_akismet, require_moderation)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      for (const row of settings.rows) {
        insertSettings.run(
          row.id,
          row.account_id,
          row.blog_url,
          row.akismet_key,
          toInt(row.use_akismet),
          toInt(row.require_moderation)
        )
      }
      counts.account_settings = settings.rows.length
      context.log(`Migrated ${counts.account_settings} account_settings`)

      // Migrate account_email_settings
      context.log('Migrating account_email_settings...')
      const emailSettings = await pgClient.query<IAccountEmailSettingsResult>(
        'SELECT * FROM account_email_settings'
      )
      const insertEmailSettings = sqliteDb.prepare(`
        INSERT INTO account_email_settings (id, account_id, notify_on_comments, send_comments_digest)
        VALUES (?, ?, ?, ?)
      `)
      for (const row of emailSettings.rows) {
        insertEmailSettings.run(
          row.id,
          row.account_id,
          toInt(row.notify_on_comments),
          toInt(row.send_comments_digest)
        )
      }
      counts.account_email_settings = emailSettings.rows.length
      context.log(`Migrated ${counts.account_email_settings} account_email_settings`)

      // Migrate tokens
      context.log('Migrating tokens...')
      const tokens = await pgClient.query<TokenRecord>('SELECT * FROM tokens')
      const insertToken = sqliteDb.prepare(`
        INSERT INTO tokens (id, account_id, token, created_at, revoked_at)
        VALUES (?, ?, ?, ?, ?)
      `)
      for (const row of tokens.rows) {
        insertToken.run(
          row.id,
          row.account_id,
          row.token,
          toISOString(row.created_at),
          toISOString(row.revoked_at)
        )
      }
      counts.tokens = tokens.rows.length
      context.log(`Migrated ${counts.tokens} tokens`)

      // Migrate comments
      context.log('Migrating comments...')
      const comments = await pgClient.query<CommentRecord>('SELECT * FROM comments')
      const insertComment = sqliteDb.prepare(`
        INSERT INTO comments (id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      for (const row of comments.rows) {
        insertComment.run(
          row.id,
          row.account_id,
          row.page_url,
          row.page_title,
          row.comment,
          row.reader_name,
          row.reader_email,
          row.reader_website,
          toISOString(row.created_at)
        )
      }
      counts.comments = comments.rows.length
      context.log(`Migrated ${counts.comments} comments`)

      // Migrate reviews
      context.log('Migrating reviews...')
      const reviews = await pgClient.query<CommentRecord>('SELECT * FROM reviews')
      const insertReview = sqliteDb.prepare(`
        INSERT INTO reviews (id, account_id, page_url, page_title, comment, reader_name, reader_email, reader_website, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      for (const row of reviews.rows) {
        insertReview.run(
          row.id,
          row.account_id,
          row.page_url,
          row.page_title,
          row.comment,
          row.reader_name,
          row.reader_email,
          row.reader_website,
          toISOString(row.created_at)
        )
      }
      counts.reviews = reviews.rows.length
      context.log(`Migrated ${counts.reviews} reviews`)

      // Migrate password_resets
      context.log('Migrating password_resets...')
      try {
        const resets = await pgClient.query<PasswordResetRecord>('SELECT * FROM password_resets')
        const insertReset = sqliteDb.prepare(`
          INSERT INTO password_resets (id, account_id, token, created_at, expires_at, used_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `)
        for (const row of resets.rows) {
          insertReset.run(
            row.id,
            row.account_id,
            row.token,
            toISOString(row.created_at),
            toISOString(row.expires_at),
            toISOString(row.used_at)
          )
        }
        counts.password_resets = resets.rows.length
        context.log(`Migrated ${counts.password_resets} password_resets`)
      } catch {
        counts.password_resets = 0
        context.log('password_resets table not found, skipping')
      }

      // Commit transaction
      sqliteDb.exec('COMMIT')
      context.log('Transaction committed')

    } catch (err) {
      sqliteDb.exec('ROLLBACK')
      throw err
    }

    // Re-enable foreign keys and close
    sqliteDb.pragma('foreign_keys = ON')
    sqliteDb.close()

    const duration = Date.now() - startTime

    const result: MigrationResult = {
      success: true,
      counts,
      duration,
    }

    context.log(`Migration complete in ${duration}ms`)

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: result,
    }

  } catch (err) {
    const duration = Date.now() - startTime
    const error = err instanceof Error ? err.message : String(err)
    context.log.error(`Migration failed: ${error}`)

    const result: MigrationResult = {
      success: false,
      counts,
      duration,
      error,
    }

    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: result,
    }
  }
}

export default migrationRun
