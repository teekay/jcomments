import { BootstrapConsole } from 'nestjs-console';
import { CliModule } from './console/console.module';

require('dotenv').config()

const bootstrap = new BootstrapConsole({
    module: CliModule,
    useDecorators: true
});
bootstrap.init().then(async (app) => {
    try {
        await app.init();
        await bootstrap.boot();
        await app.close();
        process.exit(0)
    } catch (e) {
        console.error(e);
        await app.close();
        process.exit(1);
    }
});