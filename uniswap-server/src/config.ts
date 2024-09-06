import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { USDC_TOKEN, WETH_TOKEN } from './constants'

// Inputs that configure this example to run
export interface Config {
  rpc: {
    local: string
    mainnet: string
  }
  tokens: {
    in: Token
    out: Token
    poolFee: number
  }
}

// Example Configuration
export const MainnetConfig: Config = {
  rpc: {
    local: '',
    mainnet: 'https://little-frequent-road.quiknode.pro/a80d002e9b6b2ae501f74e577b962aac110a9368',
  },
  tokens: {
    in: USDC_TOKEN,
    out: WETH_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
}