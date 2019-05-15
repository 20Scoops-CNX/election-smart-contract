import * as proxyConfig from '../contracts/App.json';
import * as electionConfig from '../contracts/ElectionContract.json';
import Web3 from 'web3';

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

  static setNetwork = async networkId => {
    if (supportedNetworks.indexOf(networkId) < 0) {
      throw new Error(
        `No configuration defined for network:${networkId}. Application supports only ${supportedNetworks.join(
          ','
        )}`
      );
    }
    selectedNetwork = networkId;

    const web3 = new Web3(window.web3.currentProvider);
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];

    // initialize contracts
    const appAddress = electionConfig.networks[selectedNetwork].address;
    const proxyAddress = proxyConfig.networks[selectedNetwork].address;

    // fist time only
    const instanceProxy = await new web3.eth.Contract(
      proxyConfig.abi,
      proxyAddress
    );

    const addressImpl = await instanceProxy.methods.implementation().call();
    if (addressImpl.toLowerCase() !== appAddress.toLowerCase()) {
      await instanceProxy.methods
        .upgradeTo(appAddress)
        .send({ from: accounts[0] });
    }

    Election = await new web3.eth.Contract(electionConfig.abi, proxyAddress);
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
