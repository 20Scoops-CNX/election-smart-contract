import * as proxyConfig from '../contracts/App.json';
import * as electionConfig from '../contracts/ElectionContract.json';

let Election = null;
let selectedNetwork = null;
let supportedNetworks = Object.keys(electionConfig.networks);

export default class Contract {
  constructor() {
    throw new Error('Do not instantiate!');
  }

  static getSupportedNetworks = () => {
    return supportedNetworks;
  };

  static setNetwork = networkId => {
    if (supportedNetworks.indexOf(networkId) < 0) {
      throw new Error(
        `No configuration defined for network:${networkId}. Application supports only ${supportedNetworks.join(
          ','
        )}`
      );
    }
    selectedNetwork = networkId;
    let { web3 } = window;

    // initialize contracts
    const appAddress = electionConfig.networks[selectedNetwork].address;
    const proxyAddress = proxyConfig.networks[selectedNetwork].address;

    // fist time only
    const instanceProxy = web3.eth.contract(proxyConfig.abi).at(proxyAddress);

    instanceProxy.implementation((err, addressImpl) => {
      if (!err) {
        if (addressImpl.toLowerCase() !== appAddress.toLowerCase()) {
          instanceProxy.upgradeTo(appAddress, (err, res) => {
            if (!err) {
              console.log('upgrade contract successfully');
            }
          });
        }
      }
    });

    Election = web3.eth.contract(electionConfig.abi).at(proxyAddress);
  };

  static Election() {
    if (!Election)
      throw new Error(
        `You must first define the network. Call Contract.setNetwork}`
      );
    return Election;
  }

  static getContractAddress() {
    return electionConfig.networks[selectedNetwork].address;
  }

  static isSocialBytecode(bytecode) {
    return electionConfig.deployedBytecode === bytecode;
  }
}
