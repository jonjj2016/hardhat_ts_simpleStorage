import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
import '@nomiclabs/hardhat-etherscan';
import 'solidity-coverage';
import 'hardhat-gas-reporter';

const GOERLI_IPS_URL = process.env.GOERLI_IPS_URL || 'https://eth-rinkeby';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xkey';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'key';
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY || 'key';

const config: HardhatUserConfig = {
    solidity: '0.8.17',
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
    networks: {
        goerli: {
            url: GOERLI_IPS_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5
        },
        localhost: {
            url: 'http://127.0.0.1:8545/',
            chainId: 31337
        }
    },
    gasReporter: {
        enabled: true, //if need report switch to true
        outputFile: 'Reports/gas-report.txt',
        noColors: true,
        currency: 'USD',
        coinmarketcap: COIN_MARKET_CAP_API_KEY
    }
};

export default config;
