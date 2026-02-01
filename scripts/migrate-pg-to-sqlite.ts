#!/usr/bin/env ts-node
/**
 * Migration script: PostgreSQL → SQLite
 *
 * Exports data from PostgreSQL and imports into a new SQLite database.
 * Useful for local dev/test with production-like data.
 *
 * Usage:
 *   npx ts-node scripts/migrate-pg-to-sqlite.ts [output-path]
 *
 * Environment variables (for Postgres connection):
 *   PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT
 *
 * Example:
 *   npx ts-node scripts/migrate-pg-to-sqlite.ts ./data/jcomments.db
 */

import { config as dotenvConfig } from 'dotenv'
import { Client } from 'pg'
import Database from 'better-sqlite3'
import * as fs from 'fs'
import * as path from 'path'

// Load .env from project root
const projectRoot = path.resolve(__dirname, '..')
const envPath = path.join(projectRoot, '.env')
const envResult = dotenvConfig({ path: envPath })

if (envResult.error) {
  console.warn(`⚠ No .env file found at ${envPath}`)
  console.warn('  Using environment variables or defaults for PostgreSQL connection\n')
} else {
  console.log(`✓ Loaded environment from ${envPath}\n`)
}

const DEFAULT_OUTPUT = './data/jcomments-migrated.db'

interface Account {
  id: string
  username: string
  email: string
  password: Buffer
  created_at: Date
}

interface AccountSettings {
  id: string
  account_id: string
  blog_url: string | null
  akismet_key: string | null
  use_akismet: boolean | null
  require_moderation: boolean
}

interface AccountEmailSettings {
  id: string
  account_id: string
  notify_on_comments: boolean | null
  send_comments_digest: boolean | null
}

interface Token {
  id: string
  account_id: string
  token: string
  created_at: Date
  revoked_at: Date | null
}

interface Comment {
  id: string
  account_id: string
  page_url: string
  page_title: string | null
  comment: string
  reader_name: string
  reader_email: string | null
  reader_website: string | null
  created_at: Date
}

interface PasswordReset {
  id: string
  account_id: string
  token: string
  created_at: Date
  expires_at: Date
  used_at: Date | null
}

async function main() {
  const outputPath = process.argv[2] || DEFAULT_OUTPUT

  console.log('=== PostgreSQL to SQLite Migration ===\n')

  // Connect to Postgres
  console.log('Connecting to PostgreSQL...')
  const pgClient = new Client({
    host: process.env.PGHOST ?? '127.0.0.1',
    user: process.env.PGUSER ?? 'postgres',
    password: process.env.PGPASSWORD ?? 'password',
    database: process.env.PGDATABASE ?? 'postgres',
    port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  })

  try {
    await pgClient.connect()
    console.log('  ✓ Connected to PostgreSQL\n')
  } catch (err) {
    console.error('  ✗ Failed to connect to PostgreSQL:', err)
    process.exit(1)
  }

  // Create SQLite database
  console.log(`Creating SQLite database at: ${outputPath}`)
  const outputDir = path.dirname(outputPath)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath)
    console.log('  ✓ Removed existing database')
  }

  const sqliteDb = new Database(outputPath)
  sqliteDb.pragma('journal_mode = WAL')
  sqliteDb.pragma('foreign_keys = OFF') // Disable during migration

  // Load and execute SQLite schema
  console.log('  Creating schema...')
  const schemaPath = path.join(__dirname, '..', 'sql', 'sqlite', 'schema.sql')
  const schema = fs.readFileSync(schemaPath, 'utf-8')
  sqliteDb.exec(schema)
  console.log('  ✓ Schema created\n')

  // Start transaction for all data inserts
  sqliteDb.exec('BEGIN TRANSACTION')

  try {
  // Migration helpers
  const toISOString = (date: Date | null): string | null =>
    date ? date.toISOString() : null

  const toInt = (bool: boolean | null): number | null =>
    bool === null ? null : bool ? 1 : 0

  // Migrate accounts
  console.log('Migrating accounts...')
  const accounts = await pgClient.query<Account>('SELECT * FROM accounts')
  const insertAccount = sqliteDb.prepare(`
    INSERT INTO accounts (id, username, email, password, created_at)
    VALUES (?, ?, ?, ?, ?)
  `)
  for (const row of accounts.rows) {
    // Password is stored as bytea in Postgres, convert to hex string for SQLite
    // If it's already a bcrypt hash (text), keep it as-is
    let passwordStr: string
    if (Buffer.isBuffer(row.password)) {
      // Check if it's a bcrypt hash stored as bytes
      const asUtf8 = row.password.toString('utf8')
      if (asUtf8.startsWith('$2')) {
        passwordStr = asUtf8
      } else {
        // Legacy SHA256 hash, store as hex
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
  console.log(`  ✓ Migrated ${accounts.rows.length} accounts\n`)

  // Migrate account_settings
  console.log('Migrating account_settings...')
  const settings = await pgClient.query<AccountSettings>('SELECT * FROM account_settings')
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
  console.log(`  ✓ Migrated ${settings.rows.length} account_settings\n`)

  // Migrate account_email_settings
  console.log('Migrating account_email_settings...')
  const emailSettings = await pgClient.query<AccountEmailSettings>(
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
  console.log(`  ✓ Migrated ${emailSettings.rows.length} account_email_settings\n`)

  // Migrate tokens
  console.log('Migrating tokens...')
  const tokens = await pgClient.query<Token>('SELECT * FROM tokens')
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
  console.log(`  ✓ Migrated ${tokens.rows.length} tokens\n`)

  // Migrate comments
  console.log('Migrating comments...')
  const comments = await pgClient.query<Comment>('SELECT * FROM comments')
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
  console.log(`  ✓ Migrated ${comments.rows.length} comments\n`)

  // Migrate reviews (spam/flagged comments)
  console.log('Migrating reviews (flagged comments)...')
  const reviews = await pgClient.query<Comment>('SELECT * FROM reviews')
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
  console.log(`  ✓ Migrated ${reviews.rows.length} reviews\n`)

  // Migrate password_resets (if table exists)
  console.log('Migrating password_resets...')
  try {
    const resets = await pgClient.query<PasswordReset>('SELECT * FROM password_resets')
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
    console.log(`  ✓ Migrated ${resets.rows.length} password_resets\n`)
  } catch {
    console.log('  ⚠ password_resets table not found, skipping\n')
  }

  // Commit the transaction
  sqliteDb.exec('COMMIT')
  console.log('✓ All data committed successfully\n')

  } catch (err) {
    // Rollback on any error
    sqliteDb.exec('ROLLBACK')
    throw err
  }

  // Re-enable foreign keys and close
  sqliteDb.pragma('foreign_keys = ON')
  sqliteDb.close()
  await pgClient.end()

  // Summary
  console.log('=== Migration Complete ===')
  console.log(`Output: ${outputPath}`)
  console.log(`Size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`)
  console.log('\nTo use this database:')
  console.log(`  export DB_PROVIDER=sqlite`)
  console.log(`  export SQLITE_PATH=${outputPath}`)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
