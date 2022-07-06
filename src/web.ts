import _ from 'lodash'
import { AccountCloser } from './web/accounts/account.closer'
import { ConfigService } from './shared/config/config.service'
import connectPgSimple from 'connect-pg-simple'
import cookieParser from 'cookie-parser'
import { config as dotenv } from 'dotenv'
import csurf from 'csurf'
import dateFormat from 'handlebars-dateformat'
import exphbs from 'express-handlebars'
import flash = require('connect-flash')
import handlebars from 'handlebars'
import helpers from 'handlebars-helpers'
import { join } from 'path'
import { json, raw, text, urlencoded } from 'express'
import { Logger } from 'nestjs-pino'
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import passport from 'passport'
import { QueuedMailer } from './shared/queue/pgboss/queued-mailer'
import { readFileSync } from 'fs'
import session from 'express-session'
import { ValidationPipe } from '@nestjs/common'
import { WebModule } from './web/web.module'

dotenv()

async function bootstrap() {
  new ConfigService().validateOrThrow()
  const isInProduction = process.env['NODE_ENVIRONMENT'] === 'production'
  const app = await NestFactory.create<NestExpressApplication>(WebModule)
  const logger = app.get(Logger)
  app.useLogger(logger)
  if (isInProduction) {
    app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
  }
  app.disable('x-powered-by')
  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'src/web'))
  app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'public' }))
  app.setViewEngine('hbs')
  helpers({handlebars})
  handlebars.registerHelper('dateFormat', dateFormat)
  handlebars.registerPartial(
    'hamburgerMenu',
    readFileSync(join(__dirname, '..', 'src/shared/partials/hamburger-menu.hbs'), 'utf8'))
  handlebars.registerPartial(
    'commentsActions',
    readFileSync(join(__dirname, '..', 'src/shared/partials/comments-actions.hbs'), 'utf8'))
  handlebars.registerPartial(
    'commentsSearch',
    readFileSync(join(__dirname, '..', 'src/shared/partials/comments-search.hbs'), 'utf8'))
  handlebars.registerPartial(
    'modalDeleteComment',
    readFileSync(join(__dirname, '..', 'src/shared/partials/delete-comment.hbs'), 'utf8'))
  handlebars.registerPartial(
    'modalDeleteComments',
    readFileSync(join(__dirname, '..', 'src/shared/partials/delete-comments.hbs'), 'utf8'))
  handlebars.registerPartial(
    'modalApproveComments',
    readFileSync(join(__dirname, '..', 'src/shared/partials/approve-comments.hbs'), 'utf8'))

  const defaultSessionLifetime = 60 * 24 * 30 // 30 days
  const cfgSessionLifetime = _.defaultTo(+(process.env['SESSION_LIFETIME'] ?? defaultSessionLifetime), defaultSessionLifetime)
  const sessionLifetime = cfgSessionLifetime * 60 * 1000
  
  app.use(
    session({
      name: 'JamComments',
      store: new (connectPgSimple(session))({tableName: 'sessions'}), // connection string created implicitly from env vars, see https://node-postgres.com/features/connecting
      cookie: {
        maxAge: sessionLifetime,
        sameSite: true,
        httpOnly: true,
        secure: isInProduction
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

  const bodyLimit = +(process.env.UPLOAD_MAX_SIZE_BYTES ?? 1024 * 1024 * 5) // 5MB default
  logger.debug(`Request body limit is ${bodyLimit} bytes`)
  app.use(json({ limit: bodyLimit}))
  app.use(urlencoded({ limit: bodyLimit, extended: true }))
  app.use(raw({ limit: bodyLimit }))
  app.use(text({ limit: bodyLimit }))
  
  app.use(cookieParser())
  app.use(flash())
  app.use(csurf({ cookie: true }))

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // CSRF error handler
  app.use(function (err, _req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

    // handle CSRF token errors here
    logger.warn('Missing CSRF key?')
    res.status(403)
    res.render('./home/views/csrf-error')
  })

  // initialize the job queue
  const queuedMailer = app.get(QueuedMailer)
  await queuedMailer.init()
  const accountCloser = app.get(AccountCloser)
  await accountCloser.init()

  await app.listen(process.env['PORT'] ?? process.env['WEB_PORT'] ?? 3030)
  logger.log(`JamComments web is running on: ${await app.getUrl()}`)
}

bootstrap()
