import { fetchQuote } from './quote';
import { getProvider } from './providers'
import { MainnetConfig } from './config';
import { toReadableAmount } from './conversion';
import { publishQuote } from './pubsub';

async function main() {
  try {
    // Setup
    const config = MainnetConfig;
    const provider = getProvider();

    // Input
    const amountIn = 10000;

    // Await the result of fetchQuote
    const results = await fetchQuote(amountIn, config, provider);

    // Parse results
    const [swapResult, , , gasEstimate] = results;
    const amountOut = toReadableAmount(swapResult, config.tokens.out.decimals);
    const gasEstimateStr = gasEstimate.toString();

    // Publish to Pub/Sub
    const messageId = await publishQuote('uniswapv3-quotes-mainnet', config.tokens.in.symbol, config.tokens.out.symbol, amountIn.toString(), amountOut, gasEstimateStr);
    console.log(`Successfully published to Pub/Sub with Message ID: ${messageId}`);

  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching pool constants:', error);
  }
}

// Run the main function every 15 seconds
setInterval(main, 15000);