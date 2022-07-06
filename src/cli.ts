import { BootstrapConsole } from 'nestjs-console'
import { config as dotenv } from 'dotenv'
import { CliModule } from './console/console.module'

dotenv()

const bootstrap = new BootstrapConsole({
  module: CliModule,
  useDecorators: true,
})
bootstrap.init().then(async (app) => {
  try {
    await app.init()
    await bootstrap.boot()
    await app.close()
    process.exit(0)
  } catch (e) {
    console.error(e)
    await app.close()
    process.exit(1)
  }
})
