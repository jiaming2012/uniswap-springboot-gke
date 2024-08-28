import { ethers } from 'ethers'

export function createWallet(provider: ethers.JsonRpcProvider): ethers.Wallet {
    const wallet = ethers.Wallet.createRandom();
    return new ethers.Wallet(wallet.privateKey, provider);
}