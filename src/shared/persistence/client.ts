import { Client, ClientConfig } from "pg";


export const databaseProviders = [
  {
    provide: 'PG_CLIENT',
    useFactory: async (): Promise<Client> => {
      const dbConfig: ClientConfig = {
        host: process.env.PGHOST ?? '127.0.0.1',
        user: process.env.PGUSER ?? 'postgres',
        password: process.env.PGPASSWORD ?? 'password',
        database: process.env.PGDATABASE ?? 'postgres',
        port: (process.env.PGPORT ? Number(process.env.PGPORT) : undefined) ?? 5432,
        ssl: !!(process.env.PGSSL) && process.env.PGSSL !== 'false'
      }

      // console.log(`DB config: ${JSON.stringify(dbConfig)}`)
          
      const client= new Client(dbConfig)
      await client.connect()
      
      return client;
    }
  }];
