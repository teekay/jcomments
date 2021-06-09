import dateFormat from 'handlebars-dateformat'
import bodyParser from 'body-parser'
import { ConfigService } from './config/config.service'
import connectPgSimple from 'connect-pg-simple'
import cookieParser from 'cookie-parser'
import { config as dotenv } from 'dotenv'
import csurf from 'csurf'
import exphbs from 'express-handlebars'
import flash = require('connect-flash')
import handlebars from 'handlebars'
import helpers from 'handlebars-helpers'
import { join } from 'path'
import { Logger } from 'nestjs-pino'
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import passport from 'passport'
import session from 'express-session'
import { ValidationPipe } from '@nestjs/common'
import { WebModule } from './web.module'

dotenv()

async function bootstrap() {
  new ConfigService().validateOrThrow()
  const app = await NestFactory.create<NestExpressApplication>(WebModule)
  const logger = app.get(Logger)
  app.useLogger(logger)
  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'src'))
  app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'public' }))
  app.setViewEngine('hbs')
  helpers({handlebars})
  handlebars.registerHelper('dateFormat', dateFormat)
  
  app.use(
    session({
      name: 'JamComments',
      store: new (connectPgSimple(session))({tableName: 'sessions'}),
      cookie: {
        maxAge: +(process.env['SESSION_LIFETIME'] ?? 1000 * 60 * 60 * 24 * 30), // 30 days default
        sameSite: true,
        httpOnly: true,
        secure: process.env['NODE_ENVIRONMENT'] === 'production'
      },
      proxy: true,
      secret: process.env['SESSION_SECRET'] ?? 'lorem ipsum',
      resave: false,
      rolling: true,
      saveUninitialized: false,
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(flash())
  app.use(csurf({ cookie: true }))

  // CSRF error handler
  app.use(function (err, _req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

    // handle CSRF token errors here
    logger.warn('Missing CSRF key?')
    res.status(403)
    res.render('./home/views/csrf-error')
  })

  await app.listen(process.env['WEB_PORT'] ?? 3030)
  logger.log(`JamComments web is running on: ${await app.getUrl()}`)
}

bootstrap()
