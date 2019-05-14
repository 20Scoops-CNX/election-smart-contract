require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
var HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
var provider = new HDWalletProvider(
  process.env.NMEMONIC,
  process.env.RINKEBY_URL
);
module.exports = new Web3(provider);
