"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvider = getProvider;
const ethers_1 = require("ethers");
const config_1 = require("./config");
function getProvider() {
    return new ethers_1.JsonRpcProvider(config_1.MainnetConfig.rpc.mainnet);
}
