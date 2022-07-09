import { config as dotenv } from 'dotenv'
import { join } from 'path'
import { Params } from 'nestjs-pino'

export function loggerConfig(): Params {
  dotenv()

  const isInProduction = process.env['NODE_ENVIRONMENT'] !== 'development'
  const base = {
    pinoHttp: {
      useLevel: isInProduction ? 'info' : 'debug',
    },
  } as const

  return isInProduction
    ? base
    : {
        pinoHttp: {
          ...base.pinoHttp,
          transport: {
            target: join(process.cwd(), './build/src/shared/logging/pino-pretty-transport'),
            options: {
              colorize: true,
              translateTime: true,
              singleLine: true,
            },
          },
        },
      }
}
