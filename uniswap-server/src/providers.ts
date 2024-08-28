import { JsonRpcProvider } from 'ethers'
import { MainnetConfig } from './config'


// todo: make this configurable
export function getProvider(): JsonRpcProvider {
  return new JsonRpcProvider(MainnetConfig.rpc.mainnet)
}