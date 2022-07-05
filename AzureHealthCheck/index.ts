import { AzureFunction, Context, Timer } from "@azure/functions"
import { bootstrap } from "../src/azure"
import { Client } from "pg"

const healthCheck: AzureFunction = async (context: Context, timer: Timer) => {
  context.log(`Performing health check. Last executed ${timer.scheduleStatus}`)
  try {
    const app = await bootstrap()
    const db: Client = await app.get('PG_CLIENT')
    const result = await db.query('select 1+1 as result')
    const val = result.rows[0]?.result
    if (val !== 2) {
      context.log.warn(val)
      throw new Error(`Problem connecting to DB :( - 1+1 = ${val}?? WTF`)
    }

    context.log('Service is healthy!')
  } catch (oops) {
    context.log.error(`Could not instantiate the app: ${(oops as Error)?.message}`)
    throw oops
  }
  
}

export default healthCheck