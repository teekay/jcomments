import { AzureServiceBusQueue } from './azure-service-bus-queue'
import { ServiceBusClient } from '@azure/service-bus'

export const jobQueueProvider = [
  {
    provide: AzureServiceBusQueue,
    useFactory: async (): Promise<AzureServiceBusQueue> => {
      if (!process.env['SERVICEBUS_CONNECTION']) {
        throw new Error('Missing env var: SERVICEBUS_CONNECTION')
      }

      return new AzureServiceBusQueue(new ServiceBusClient(process.env['SERVICEBUS_CONNECTION']))
    },
  },
]
