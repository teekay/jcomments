import { ServiceBusClient, ServiceBusMessage, ServiceBusSender } from '@azure/service-bus';
import { CommentEvent, CommentEventBody } from '../comments/comment.event';
import { Queue } from './queue.interface';

export enum Topics {
    Comments = 'comment-events'
}

export class AzureServiceBusQueue implements Queue {
    constructor(private readonly sbClient: ServiceBusClient) {}

    public async publish(message: CommentEventBody): Promise<void> {
        await this.sendMessageToServiceBusTopic(Topics.Comments, new CommentEvent(message));
    }

    async stop(): Promise<void> {
      // no-op
    }

    private async sendMessageToServiceBusTopic(
        topic: string,
        message: ServiceBusMessage | ServiceBusMessage[]
    ): Promise<void> {
        const sender: ServiceBusSender = this.sbClient.createSender(topic);

        try {
            await sender.sendMessages(message);
        } catch (err) {
            throw new Error(`Error while sending message to service bus: ${err}`);
        } finally {
            await sender.close();
        }
    }
}
