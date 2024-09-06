"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishQuote = publishQuote;
const pubsub_1 = require("@google-cloud/pubsub");
// Create a new Pub/Sub client
const pubSubClient = new pubsub_1.PubSub();
function publishQuote(topicName, symbolIn, symbolOut, amountIn, amountOut, gasEstimate) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = new Date().toISOString(); // Get the current timestamp in RFC 3339 format
        const json = { symbolIn, symbolOut, amountIn, amountOut, gasEstimate, timestamp };
        const messageBuffer = Buffer.from(JSON.stringify(json));
        const message = {
            data: messageBuffer,
        };
        try {
            const messageId = yield pubSubClient.topic(topicName).publishMessage(message);
            return messageId;
        }
        catch (error) {
            return error;
        }
    });
}
