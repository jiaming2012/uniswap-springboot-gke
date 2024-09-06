import { JsonRpcProvider } from 'ethers'
import { MainnetConfig } from './config'


export function getProvider(): JsonRpcProvider {
  return new JsonRpcProvider(MainnetConfig.rpc.mainnet)
}