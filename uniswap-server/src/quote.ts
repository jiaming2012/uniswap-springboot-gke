import { ethers } from 'ethers'
import { Config } from './config'
import { computePoolAddress } from '@uniswap/v3-sdk'
import { BigNumber } from '@ethersproject/bignumber';
import QuoterV2 from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
} from './constants'
import { fromReadableAmount } from './conversion'


// Use type assertions to inform TypeScript about `quoteExactInputSingle` existence:
export async function fetchQuote(amountInInput: number, wallet: ethers.Wallet, config: Config, provider: ethers.JsonRpcProvider): Promise<Array<BigNumber>> {
  interface QuoteExactInputSingleParams {
    tokenIn: string
    tokenOut: string
    fee: number
    amountIn: string
    sqrtPriceLimitX96: number
  }

  const quoterContract = new ethers.Contract(QUOTER_CONTRACT_ADDRESS, QuoterV2.abi, wallet) as ethers.Contract & {
        quoteExactInputSingle: {
          staticCall: (params: QuoteExactInputSingleParams) => Promise<Array<BigNumber>>
        }
  };

  const poolConstants = await getPoolConstants(config, provider);

  const amountIn = fromReadableAmount(
    amountInInput,
    config.tokens.in.decimals
  );

  const params = {
    tokenIn: poolConstants.token0,
    tokenOut: poolConstants.token1,
    fee: poolConstants.fee,
    amountIn: amountIn.toString(),
    sqrtPriceLimitX96: 0
  };

  return quoterContract.quoteExactInputSingle.staticCall(params);
}

async function getPoolConstants(config: Config, provider: ethers.Provider): Promise<{
  token0: string
  token1: string
  fee: number
}> {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: config.tokens.in,
    tokenB: config.tokens.out,
    fee: config.tokens.poolFee,
  })

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    provider
  )

  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ])

  return {
    token0,
    token1,
    fee,
  }
}