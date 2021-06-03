import { AppModule } from './app.module'
import exphbs from 'express-handlebars'
import flash = require('connect-flash')
import { join } from 'path'
import handlebars from 'handlebars'
import helpers from 'handlebars-helpers'
import { Logger } from 'nestjs-pino'
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import passport from 'passport'
import session from 'express-session'
import { ValidationPipe } from '@nestjs/common'

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
  app.use(flash())

  await app.listen(3000)
  logger.log(`JamComments is running on: ${await app.getUrl()}`)
}

bootstrap()
