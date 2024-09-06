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
const quote_1 = require("./quote");
const providers_1 = require("./providers");
const config_1 = require("./config");
const conversion_1 = require("./conversion");
const pubsub_1 = require("./pubsub");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Setup
            const config = config_1.MainnetConfig;
            const provider = (0, providers_1.getProvider)();
            // Input
            const amountIn = 10000;
            // Await the result of fetchQuote
            const results = yield (0, quote_1.fetchQuote)(amountIn, config, provider);
            // Parse results
            const [swapResult, , , gasEstimate] = results;
            const amountOut = (0, conversion_1.toReadableAmount)(swapResult, config.tokens.out.decimals);
            const gasEstimateStr = gasEstimate.toString();
            // Publish to Pub/Sub
            const messageId = yield (0, pubsub_1.publishQuote)('uniswapv3-quotes-mainnet', config.tokens.in.symbol, config.tokens.out.symbol, amountIn.toString(), amountOut, gasEstimateStr);
            console.log(`Successfully published to Pub/Sub with Message ID: ${messageId}`);
        }
        catch (error) {
            // Handle any errors that occur
            console.error('Error fetching pool constants:', error);
        }
    });
}
// Run the main function every 15 seconds
setInterval(main, 15000);
