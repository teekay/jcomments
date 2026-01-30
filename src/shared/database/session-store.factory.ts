import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import SqliteStore from 'better-sqlite3-session-store'
import Database from 'better-sqlite3'
import * as fs from 'fs'
import * as path from 'path'
import { getDatabaseProvider } from './database.module'

export function createSessionStore(sessionModule: typeof session): session.Store {
  const provider = getDatabaseProvider()

  if (provider === 'sqlite') {
    return createSqliteSessionStore(sessionModule)
  }

  return createPostgresSessionStore(sessionModule)
}

function createPostgresSessionStore(sessionModule: typeof session): session.Store {
  const PgStore = connectPgSimple(sessionModule)
  return new PgStore({ tableName: 'sessions' })
}

function createSqliteSessionStore(sessionModule: typeof session): session.Store {
  const dbPath = process.env.SQLITE_PATH ?? './data/jcomments.db'
  const dbDir = path.dirname(dbPath)

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
  }

  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')

  const SqliteSessionStore = SqliteStore(sessionModule)
  return new SqliteSessionStore({
    client: db,
    expired: {
      clear: true,
      intervalMs: 900000, // 15 minutes
    },
  })
}
