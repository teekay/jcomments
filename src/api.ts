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
  
  app.use(
    session({
      name: 'JamComments',
      store: new (require('connect-pg-simple')(session))({tableName: 'sessions'}),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // TODO make configurable? 30 days default
        sameSite: true,
        httpOnly: true,
        secure: process.env['NODE_ENVIRONMENT'] === 'production'
      },
      proxy: true,
      secret: '70b69152-50df-488a-9135-5ff4ab0516ab', // TODO use env var?
      resave: false,
      rolling: true,
      saveUninitialized: false,
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(bodyParser())
  app.use(cookieParser())
  app.use(flash())
  app.use(csurf({ cookie: true }))

  // error handler
  app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

    // handle CSRF token errors here
    logger.warn('Missing CSRF key?')
    logger.log(req.session.csrfToken)
    logger.log(req.cookies)
    logger.log(req.body)
    res.status(403)
    res.render('./home/views/csrf-error')
  })

  await app.listen(3000)
  logger.log(`JamComments is running on: ${await app.getUrl()}`)
}

bootstrap()
