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
    mainnet: '',
  },
  tokens: {
    in: USDC_TOKEN,
    out: WETH_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
}