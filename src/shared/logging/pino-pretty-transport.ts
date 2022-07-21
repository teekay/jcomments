import colada from 'pino-colada'
import pinoPretty from 'pino-pretty'

module.exports = (opts) =>
  pinoPretty({
    ...opts,
    messageFormat: colada(),
  })
