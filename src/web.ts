import { AppModule } from './app.module'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
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
import _ from 'lodash'

require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const logger = app.get(Logger)
  app.useLogger(logger)
  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'src'))
  app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'public' }))
  app.setViewEngine('hbs')
  helpers({handlebars})
  handlebars.registerHelper('dateFormat', require('handlebars-dateformat'))
  
  app.use(
    session({
      name: 'JamComments',
      store: new (require('connect-pg-simple')(session))({tableName: 'sessions'}),
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

  await app.listen(3000)
  logger.log(`JamComments web is running on: ${await app.getUrl()}`)
}

bootstrap()
