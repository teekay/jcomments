import { Module, Global, DynamicModule } from '@nestjs/common'
import { Client, ClientConfig } from 'pg'
import Database from 'better-sqlite3'
import * as fs from 'fs'
import * as path from 'path'

import {
  ACCOUNT_REPOSITORY,
  TOKEN_REPOSITORY,
  AUTH_REPOSITORY,
  COMMENT_REPOSITORY,
} from '../repositories'
import {
  PostgresAccountRepository,
  PostgresTokenRepository,
  PostgresAuthRepository,
  PostgresCommentRepository,
} from '../repositories/postgres'
import {
  SqliteAccountRepository,
  SqliteTokenRepository,
  SqliteAuthRepository,
  SqliteCommentRepository,
} from '../repositories/sqlite'

export type DatabaseProvider = 'postgres' | 'sqlite'

export function getDatabaseProvider(): DatabaseProvider {
  const provider = process.env.DB_PROVIDER?.toLowerCase()
  if (provider === 'sqlite') return 'sqlite'
  return 'postgres'
}

const postgresClientProvider = {
  provide: 'PG_CLIENT',
  useFactory: async (): Promise<Client> => {
    const dbConfig: ClientConfig = {
      host: process.env.PGHOST ?? '127.0.0.1',
      user: process.env.PGUSER ?? 'postgres',
      password: process.env.PGPASSWORD ?? 'password',
      database: process.env.PGDATABASE ?? 'postgres',
      port: (process.env.PGPORT ? Number(process.env.PGPORT) : undefined) ?? 5432,
      ssl: process.env.PGSSLMODE === 'require',
      connectionTimeoutMillis: 5000,
    }
    const client = new Client(dbConfig)

    try {
      await client.connect()
      return client
    } catch (oops) {
      console.error('Problem connecting to the database')
      throw oops
    }
  },
}

const sqliteClientProvider = {
  provide: 'SQLITE_DB',
  useFactory: (): Database.Database => {
    const dbPath = process.env.SQLITE_PATH ?? './data/jcomments.db'
    const dbDir = path.dirname(dbPath)

    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }

    const db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')

    return db
  },
}

function createPostgresProviders() {
  return [
    postgresClientProvider,
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: PostgresAccountRepository,
    },
    {
      provide: TOKEN_REPOSITORY,
      useClass: PostgresTokenRepository,
    },
    {
      provide: AUTH_REPOSITORY,
      useClass: PostgresAuthRepository,
    },
    {
      provide: COMMENT_REPOSITORY,
      useClass: PostgresCommentRepository,
    },
  ]
}

function createSqliteProviders() {
  return [
    sqliteClientProvider,
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: SqliteAccountRepository,
    },
    {
      provide: TOKEN_REPOSITORY,
      useClass: SqliteTokenRepository,
    },
    {
      provide: AUTH_REPOSITORY,
      useClass: SqliteAuthRepository,
    },
    {
      provide: COMMENT_REPOSITORY,
      useClass: SqliteCommentRepository,
    },
  ]
}

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const provider = getDatabaseProvider()
    const providers = provider === 'sqlite'
      ? createSqliteProviders()
      : createPostgresProviders()

    return {
      module: DatabaseModule,
      providers,
      exports: [
        provider === 'sqlite' ? 'SQLITE_DB' : 'PG_CLIENT',
        ACCOUNT_REPOSITORY,
        TOKEN_REPOSITORY,
        AUTH_REPOSITORY,
        COMMENT_REPOSITORY,
      ],
    }
  }
}
