import PgBoss from 'pg-boss'

export const jobQueueProviders = [
  {
    provide: 'PG_BOSS',
    useFactory: async (): Promise<PgBoss> => {
      const c = {
        host: process.env.PGHOST ?? '127.0.0.1',
        port: (process.env.PGPORT ? Number(process.env.PGPORT) : undefined) ?? 5432,
        user: process.env.PGUSER ?? 'postgres',
        password: process.env.PGPASSWORD ?? 'password',
        database: process.env.PGDATABASE ?? 'postgres',
        ssl: !!(process.env.PGSSL) && process.env.PGSSL !== 'false'
      };
      const connectionString = `postgres://${c.user}:${encodeURIComponent(c.password)}@${c.host}:${c.port}/${c.database}${c.ssl ? '?ssl=true' : ''}`
      const boss = new PgBoss(connectionString)
      await boss.start()
      return boss
    }
  }
]