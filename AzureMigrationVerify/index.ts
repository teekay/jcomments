import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { appContext } from '../src/azure'
import { Client } from 'pg'
import Database from 'better-sqlite3'
import * as fs from 'fs'

interface TableComparison {
  table: string
  pgCount: number
  sqliteCount: number
  match: boolean
  sampleCheck?: {
    checked: number
    matched: number
    mismatches: string[]
  }
}

interface VerificationResult {
  success: boolean
  sqlitePath: string
  sqliteExists: boolean
  sqliteSizeKB: number
  tables: TableComparison[]
  allCountsMatch: boolean
  allSamplesMatch: boolean
  error?: string
}

const TABLES_TO_VERIFY = [
  'accounts',
  'account_settings',
  'account_email_settings',
  'tokens',
  'comments',
  'reviews',
  'password_resets',
]

const migrationVerify: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('JamComments - Verifying PostgreSQL to SQLite migration')

  const sqlitePath = process.env.SQLITE_PATH
  if (!sqlitePath) {
    context.res = {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
      body: { success: false, error: 'SQLITE_PATH environment variable not set' },
    }
    return
  }

  const result: VerificationResult = {
    success: false,
    sqlitePath,
    sqliteExists: false,
    sqliteSizeKB: 0,
    tables: [],
    allCountsMatch: true,
    allSamplesMatch: true,
  }

  try {
    // Check if SQLite file exists
    if (!fs.existsSync(sqlitePath)) {
      result.error = `SQLite database not found at ${sqlitePath}`
      context.res = {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
        body: result,
      }
      return
    }

    result.sqliteExists = true
    result.sqliteSizeKB = Math.round(fs.statSync(sqlitePath).size / 1024)

    // Get Postgres client from app context
    const app = await appContext()
    const pgClient: Client = await app.get('PG_CLIENT')

    // Open SQLite database
    const sqliteDb = new Database(sqlitePath, { readonly: true })

    // Compare each table
    for (const table of TABLES_TO_VERIFY) {
      const comparison: TableComparison = {
        table,
        pgCount: 0,
        sqliteCount: 0,
        match: false,
      }

      try {
        // Get Postgres count
        const pgResult = await pgClient.query(`SELECT COUNT(*) as count FROM ${table}`)
        comparison.pgCount = parseInt(pgResult.rows[0].count, 10)

        // Get SQLite count
        const sqliteResult = sqliteDb.prepare(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number }
        comparison.sqliteCount = sqliteResult.count

        comparison.match = comparison.pgCount === comparison.sqliteCount

        if (!comparison.match) {
          result.allCountsMatch = false
        }

        // Sample check: compare first and last 3 records by ID
        if (comparison.pgCount > 0) {
          const sampleCheck = await verifySamples(pgClient, sqliteDb, table, context)
          comparison.sampleCheck = sampleCheck
          if (sampleCheck.matched !== sampleCheck.checked) {
            result.allSamplesMatch = false
          }
        }

      } catch (err) {
        // Table might not exist in one or both databases
        const errorMsg = err instanceof Error ? err.message : String(err)
        if (errorMsg.includes('does not exist') || errorMsg.includes('no such table')) {
          context.log(`Table ${table} not found in one or both databases`)
          comparison.match = comparison.pgCount === 0 && comparison.sqliteCount === 0
        } else {
          throw err
        }
      }

      result.tables.push(comparison)
    }

    sqliteDb.close()

    result.success = result.allCountsMatch && result.allSamplesMatch

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: result,
    }

  } catch (err) {
    const error = err instanceof Error ? err.message : String(err)
    context.log.error(`Verification failed: ${error}`)
    result.error = error

    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: result,
    }
  }
}

async function verifySamples(
  pgClient: Client,
  sqliteDb: Database.Database,
  table: string,
  context: Context
): Promise<{ checked: number; matched: number; mismatches: string[] }> {
  const result = { checked: 0, matched: 0, mismatches: [] as string[] }

  try {
    // Get sample IDs from Postgres (first 3 and last 3)
    const pgSampleIds = await pgClient.query(
      `(SELECT id FROM ${table} ORDER BY id ASC LIMIT 3)
       UNION ALL
       (SELECT id FROM ${table} ORDER BY id DESC LIMIT 3)`
    )

    const uniqueIds = [...new Set(pgSampleIds.rows.map(r => r.id))]

    for (const id of uniqueIds) {
      result.checked++

      // Get record from Postgres
      const pgRecord = await pgClient.query(`SELECT * FROM ${table} WHERE id = $1`, [id])
      if (pgRecord.rows.length === 0) continue

      // Get record from SQLite
      const sqliteRecord = sqliteDb.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id) as Record<string, unknown> | undefined
      if (!sqliteRecord) {
        result.mismatches.push(`${table}:${id} - missing in SQLite`)
        continue
      }

      // Compare key fields (not all fields due to type differences)
      const pgRow = pgRecord.rows[0]
      let matches = true

      // Compare ID
      if (pgRow.id !== sqliteRecord.id) {
        matches = false
        result.mismatches.push(`${table}:${id} - id mismatch`)
      }

      // For accounts, check username and email
      if (table === 'accounts') {
        if (pgRow.username !== sqliteRecord.username) {
          matches = false
          result.mismatches.push(`${table}:${id} - username mismatch`)
        }
        if (pgRow.email !== sqliteRecord.email) {
          matches = false
          result.mismatches.push(`${table}:${id} - email mismatch`)
        }
      }

      // For comments/reviews, check comment text
      if (table === 'comments' || table === 'reviews') {
        if (pgRow.comment !== sqliteRecord.comment) {
          matches = false
          result.mismatches.push(`${table}:${id} - comment mismatch`)
        }
        if (pgRow.reader_name !== sqliteRecord.reader_name) {
          matches = false
          result.mismatches.push(`${table}:${id} - reader_name mismatch`)
        }
      }

      // For tokens, check token value
      if (table === 'tokens') {
        if (pgRow.token !== sqliteRecord.token) {
          matches = false
          result.mismatches.push(`${table}:${id} - token mismatch`)
        }
      }

      if (matches) {
        result.matched++
      }
    }

  } catch (err) {
    context.log.warn(`Sample verification failed for ${table}: ${err}`)
  }

  return result
}

export default migrationVerify
