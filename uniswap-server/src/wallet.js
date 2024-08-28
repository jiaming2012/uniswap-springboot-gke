"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = createWallet;
const ethers_1 = require("ethers");
function createWallet(provider) {
    const wallet = ethers_1.ethers.Wallet.createRandom();
    return new ethers_1.ethers.Wallet(wallet.privateKey, provider);
}
