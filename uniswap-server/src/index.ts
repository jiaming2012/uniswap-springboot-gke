import { fetchQuote } from './quote';
import { createWallet } from './wallet';
import { getProvider } from './providers'
import { MainnetConfig } from './config';
import { toReadableAmount } from './conversion';

// Define an async function to call getPoolConstants
async function main() {
  try {
    // Setup
    const config = MainnetConfig;
    const provider = getProvider();

    // Create a wallet with the provider, necessary for signing transactions
    const wallet = createWallet(provider);

    // Input
    const amountIn = 10000;

    // Await the result of fetchQuote
    const results = await fetchQuote(amountIn, wallet, config, provider);

    // Parse results
    const [amountOut, , , gasEstimate] = results;

    // Log the result to the console
    console.log(`${config.tokens.in.symbol} in: ${amountIn}`);
    console.log(`${config.tokens.out.symbol} out: ${toReadableAmount(amountOut, config.tokens.out.decimals)}`);
    console.log(`Gas estimate: ${gasEstimate.toString()} wei`);

  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching pool constants:', error);
  }
}

// Call the main function
main();