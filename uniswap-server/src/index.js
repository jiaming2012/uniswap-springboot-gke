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
const wallet_1 = require("./wallet");
const providers_1 = require("./providers");
const config_1 = require("./config");
const conversion_1 = require("./conversion");
// Define an async function to call getPoolConstants
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Setup
            const config = config_1.MainnetConfig;
            const provider = (0, providers_1.getProvider)();
            // Create a wallet with the provider, necessary for signing transactions
            const wallet = (0, wallet_1.createWallet)(provider);
            // Input
            const amountIn = 10000;
            // Await the result of fetchQuote
            const results = yield (0, quote_1.fetchQuote)(amountIn, wallet, config, provider);
            // Parse results
            const [amountOut, , , gasEstimate] = results;
            // Log the result to the console
            console.log(`${config.tokens.in.symbol} in: ${amountIn}`);
            console.log(`${config.tokens.out.symbol} out: ${(0, conversion_1.toReadableAmount)(amountOut, config.tokens.out.decimals)}`);
            console.log(`Gas estimate: ${gasEstimate.toString()} wei`);
        }
        catch (error) {
            // Handle any errors that occur
            console.error('Error fetching pool constants:', error);
        }
    });
}
// Call the main function
main();
