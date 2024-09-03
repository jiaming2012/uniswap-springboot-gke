"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchQuote = fetchQuote;
const ethers_1 = require("ethers");
const v3_sdk_1 = require("@uniswap/v3-sdk");
const QuoterV2_json_1 = __importDefault(require("@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json"));
const IUniswapV3Pool_json_1 = __importDefault(require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json"));
const constants_1 = require("./constants");
const conversion_1 = require("./conversion");
// Use type assertions to inform TypeScript about `quoteExactInputSingle` existence:
function fetchQuote(amountInInput, config, provider) {
    return __awaiter(this, void 0, void 0, function* () {
        const quoterContract = new ethers_1.ethers.Contract(constants_1.QUOTER_CONTRACT_ADDRESS, QuoterV2_json_1.default.abi, provider);
        const poolConstants = yield getPoolConstants(config, provider);
        const amountIn = (0, conversion_1.fromReadableAmount)(amountInInput, config.tokens.in.decimals);
        const params = {
            tokenIn: poolConstants.token0,
            tokenOut: poolConstants.token1,
            fee: poolConstants.fee,
            amountIn: amountIn.toString(),
            sqrtPriceLimitX96: 0
        };
        return quoterContract.quoteExactInputSingle.staticCall(params);
    });
}
function getPoolConstants(config, provider) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentPoolAddress = (0, v3_sdk_1.computePoolAddress)({
            factoryAddress: constants_1.POOL_FACTORY_CONTRACT_ADDRESS,
            tokenA: config.tokens.in,
            tokenB: config.tokens.out,
            fee: config.tokens.poolFee,
        });
        const poolContract = new ethers_1.ethers.Contract(currentPoolAddress, IUniswapV3Pool_json_1.default.abi, provider);
        const [token0, token1, fee] = yield Promise.all([
            poolContract.token0(),
            poolContract.token1(),
            poolContract.fee(),
        ]);
        return {
            token0,
            token1,
            fee,
        };
    });
}
