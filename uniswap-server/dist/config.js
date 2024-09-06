"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainnetConfig = void 0;
const v3_sdk_1 = require("@uniswap/v3-sdk");
const constants_1 = require("./constants");
// Example Configuration
exports.MainnetConfig = {
    rpc: {
        local: '',
        mainnet: 'https://little-frequent-road.quiknode.pro/a80d002e9b6b2ae501f74e577b962aac110a9368',
    },
    tokens: {
        in: constants_1.USDC_TOKEN,
        out: constants_1.WETH_TOKEN,
        poolFee: v3_sdk_1.FeeAmount.MEDIUM,
    },
};
