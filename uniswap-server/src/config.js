"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainnetConfig = void 0;
const v3_sdk_1 = require("@uniswap/v3-sdk");
const constants_1 = require("./constants");
// Example Configuration
exports.MainnetConfig = {
    rpc: {
        local: '',
        mainnet: '',
    },
    tokens: {
        in: constants_1.USDC_TOKEN,
        out: constants_1.WETH_TOKEN,
        poolFee: v3_sdk_1.FeeAmount.MEDIUM,
    },
};
