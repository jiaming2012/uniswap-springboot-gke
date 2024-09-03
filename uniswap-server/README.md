This section of the repo creates a backend service that bridges a blockchain endpoint and uniswap endpoint to fetch a USDC/WETH quote.

## Set up quicknode

In order to connect to the blockchain, an http ethereum mainnet endpoint is required. A free endpoint can be obtained at https://quicknode.com.

# Install
``` bash
cd path/to/uniswap-springboot-gke/web3/uniswap-server
npm install
npm install -g yarn
yarn add typescript --dev
```

# Compile
``` bash
yarn tsc
```

# Run it
``` bash
node src/index.js
```