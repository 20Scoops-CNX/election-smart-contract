const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const HDWalletProvider = require('truffle-hdwallet-provider');

function getProvider(networkUrl) {
  return new HDWalletProvider(process.env.NMEMONIC, networkUrl);
}

module.exports = {
  contracts_build_directory: path.join(__dirname, 'app/src/contracts'),
  solc: {
    optimizer: {
      enabled: true,
      runs: 2000
    }
  },
  mocha: {
    useColors: true,
    enableTimeouts: false
  },
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      from: '0x5340791a973b9a2261442da715a05dc35d7fc642'
    },
    production: {
      provider: () => getProvider(process.env.MAINNET_URL),
      network_id: '1',
      from: process.env.ADDRESS_DEPLOY,
      production: true,
      confirmations: 2,
      websockets: true
    },
    ropsten: {
      provider: () => getProvider(process.env.ROPSTEN_URL),
      network_id: '3',
      from: process.env.ADDRESS_DEPLOY,
      confirmations: 2,
      websockets: true
    },
    rinkeby: {
      provider: () => getProvider(process.env.RINKEBY_URL),
      network_id: '4',
      from: process.env.ADDRESS_DEPLOY,
      confirmations: 2,
      websockets: true
    },
    kovan: {
      provider: () => getProvider(process.env.KOVAN_URL),
      network_id: '42',
      from: process.env.ADDRESS_DEPLOY,
      confirmations: 2,
      websockets: true
    },
    goerli: {
      provider: () => getProvider(process.env.GOERLI_URL),
      network_id: '5',
      from: process.env.ADDRESS_DEPLOY,
      confirmations: 2,
      websockets: true
    }
  }
};
