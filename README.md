Keywords: Google cloud, GKE, Kubernetes, Terraform, Web3, Blockchain, DeFi, Java, Springboot, TypeScript, Nest.js

Monthly subscription can add up. 

$10 here, $20 here, and before you look up, you are swimming in hundreds of dollars and Technologies subscription fees for hobby projects that you love but still eat at your budget. In the tutorial my goal is to create a cloud platform that is as inexpensive as possible so that we can learn without breaking our budget.

In order to achieve this we will set up no cluster management fee for one Autopilot on. When you create a cluster in Autopilot mode, you don't pay a cluster management fee. Instead, you are billed per second for the vCPU, memory, and disk resources used by your pods. This is generally more cost-effective for smaller or sporadic workloads.

Our project has a simple goal: to create a crypto app that quotes the currently price of WETH to USDC on Uniswap, one of the most popular DeFi exchanges.

Requirement
Some of the requirements for our project is that we are able to iterate and in doing so reach a larger, potentially global audience, as Blockchain is without borders

- Low latency
- Scalable
- Cost: especially during development,mm m

Architecture
- Kubernetes: We want to leverage, horizontal part, auto scaling, self-healing, ruling updates, and other features for creating a scalable app
- Infura: In order to connect to the Blockchain, we must self host and Ethereum node, or use a third-party service, such as in four, which we will use to speed up our initial development time.
- Springboot: 

In order to speed data processing, we will leverage googles, pops up service to publish data close to our in for nude and subscribe with workers that can be deployed in various regions across the world.

 Technically interacting with the block team is or can be done in any programming language, since it is open source and open protocol. In practice, the Yuna swap, SDK is written in JavaScript, which takes care of mini low-level block, chain specific unit conversion and payload constructions.

 And we will use a micro services architecture to leverage the Yuna swap, STK in JavaScript, and create or enterprise application in spring boot, where we can leverage Enterprise ready and security features, as well as a strong developer community.


Instructions

Install gcloud and terraform
``` bash
brew update
brew install --cask google-cloud-sdk
brew install terraform
```

I'm using brew or Mac, but insulation will be similar depending what development computer using.

Create a working directory:
``` bash
mkdir gke-cluster
cd gke-cluster
```



Show ping test

https://www.site24x7.com/tools/ping-test.html

From the results of the speed test, From Virginia, the response time is 2 ms, indicating a very fast connection.

1. Location
The test was conducted from multiple locations around the world: Fremont, Virginia, Stockholm, and Nagano.
2. Status
This column shows whether the server is reachable from that location. A green circle with an up arrow indicates the server is reachable (up), and a red circle with a down arrow indicates the server is not reachable (down).
3. IP
The IP address 150.136.239.208 is the address that was pinged from each location.

We want to place our kubernetes cluster closest to our data source in Virginia. The Google Cloud region closest to Virginia is us-east4, which is located in Ashburn, Virginia.

Create a main.tf file with the following content:
``` hcl
provider "google" {
  project = "<YOUR_PROJECT_ID>"
  region  = "us-central1"
}

resource "google_container_cluster" "autopilot_cluster" {
  name     = "autopilot-cluster"
  location = "us-east4"

  enable_autopilot = true

  # No need to specify use_ip_aliases; it's handled by GKE Autopilot
}
```

This Terraform configuration sets up a Google Cloud provider with a specified project and region. It defines a Google Kubernetes Engine (GKE) cluster resource named "autopilot-cluster" in the us-east4 region, with Autopilot mode enabled. Autopilot mode automatically manages infrastructure and optimizes the cluster, so no manual configuration for IP aliases is needed. This setup allows for efficient and simplified cluster management in Google Cloud.

## Grab our Project ID and enable the Kubernetes Engine API
The next steps can easily be done in the google console

[Insert screenshot of Project ID]


---

Enable the Kubernetes Engine API. You will need to create a billing account; however, by using staying under the free tier limits, we will avoid being charged.

---

Now that our cloud configuration is set up, lets spin up our cluster

Authenticate with Google Cloud
``` bash
gcloud auth application-default login
```

Initialize Terraform in your project directory:
``` bash
terraform init
```

Then, apply the Terraform configuration to create the cluster:
``` bash
terraform apply
```

[Show screenshot of output]

## Connected with `kubectl`
Head back to the Google Console, find the newly created cluster and click "Connect." A `gcloud` command will appear. Copy the command and paste it into your terminal to connect to your cluster.

Verify that you are connected by running:
``` bash
kubectl config current-context
```

You should see similar output:
[Screenshot]


# Uniswap server
Note some differences from the tutorial that changed
- several utilities methods moved from `ethers` to `@ethersproject/bignumber` and `@ethersproject/units`

In the uniswap example code, we try to call the quoteExactInputSingle method on a contract instance, but TypeScript is not recognizing it as a valid method. This can happen if the contract's ABI does not include the method or if the contract instance is not typed correctly.

To resolve this, you need to ensure that the ABI includes the quoteExactInputSingle method and that the contract instance is typed correctly. Here's how you can define the ABI and create a properly typed contract instance:

Define the ABI with the quoteExactInputSingle method.
Create a contract instance with the correct type.

Next, lets create an Nest.js application for connecting to Uniswap

``` bash
mkdir uniswap-server
cd uniswap-server
```

Install TypeScript
``` bash
npm install --save-dev typescript
tsc --init
```

Install ethereum and uniswap libraries
``` bash
npm init
npm install ethers
npm install @uniswap/v3-sdk
npm install @uniswap/sdk-core
npm install @ethersproject/bignumber
npm install @ethersproject/units
```

Create a `src` directory:
``` bash
mkdir src
cd src
```

Add the following files

quote.ts

config.ts
Add the the `http` address from Quicknode.

In `tsconfig.json`, uncomment`"resolveJsonModule": true,` to enable importing .json files.

Compile, and Run it!
``` bash
tsc
node index.js
```

Obtaining a quote from Uniswap V3 results in state-changing operations on the blockchain; hence, it is actually not a read-only operation, which can be used in a `view` function. Instead, the quoter contract uses a crafty solution that simulates the state-changing transaction using a `eth_call` request, and deliberately places a `revert` operation at the end of the contract to return the results from the transaction, while also reverting the state.


## Adding a Signer
If you are coming from Web3.js, you are used to a Provider offering both read and write access. In Ethers, all write operations are further abstracted into another Object, the Signer.

The guide uses the Quoter address, instead of QuoterV2

you can pass either a wallet or a provider here
``` javascript
new ethers.Contract(QUOTER_CONTRACT_ADDRESS, QuoterV2.abi, provider) 
```

Since we are not actually sending a transaction to the blockchain, we can choose to only pass a provider.