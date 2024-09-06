import { PubSub } from '@google-cloud/pubsub';
import { MessageOptions } from '@google-cloud/pubsub/build/src/topic';

// Create a new Pub/Sub client
const pubSubClient = new PubSub();

export async function publishQuote(topicName: string, symbolIn: string, symbolOut: string, amountIn: string, amountOut: string, gasEstimate: string): Promise<string | Error> {
    const timestamp = new Date().toISOString(); // Get the current timestamp in RFC 3339 format
    const json = { symbolIn, symbolOut, amountIn, amountOut, gasEstimate, timestamp };
    const messageBuffer = Buffer.from(JSON.stringify(json));

    const message: MessageOptions = {
            data: messageBuffer,
        };

    try {
        const messageId = await pubSubClient.topic(topicName).publishMessage(message);
        return messageId;
    } catch (error) {
        return error;
    }
}