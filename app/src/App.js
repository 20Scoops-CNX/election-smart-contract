import React, { Component } from 'react';
import './App.css';
import Routes from './containers/Routes';
import Contract from './services/Contract';
import DownloadMetamask from './components/DownloadMetamask';
import UnSupportNetwork from './components/UnSupportNetwork';
import { message } from 'antd';
import EventBus from 'eventbusjs';

const { web3 } = window;
const RELOAD_EVENT = 'reload_data_event';

class App extends Component {
  state = {
    networkName: '',
    networkId: '',
    address: '',
    isMetaMask: false
  };

  checkNetworkId = () => {
    web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case '1':
          this.setState({ networkName: 'Mainnet', networkId: netId });
          break;
        case '3':
          this.setState({ networkName: 'Ropsten', networkId: netId });
          break;
        case '4':
          this.setState({ networkName: 'Rinkeby', networkId: netId });
          break;
        case '5':
          this.setState({ networkName: 'Goerli', networkId: netId });
          break;
        case '42':
          this.setState({ networkName: 'Kovan', networkId: netId });
          break;
        case '1234567':
          this.setState({ networkName: 'Localhost', networkId: netId });
          break;
        default:
          this.setState({ networkName: 'Unknown', networkId: netId });
      }
    });
  };

  getAccountUser = () => {
    web3.eth.getAccounts((err, accounts) => {
      if (err) {
        message.warn("We can't get your account");
      } else {
        this.setState({ address: accounts[0] });
      }
    });
  };

  loadData = () => {
    this.checkNetworkId();
    this.getAccountUser();
  };

  async componentDidMount() {
    if (!web3) return;
    if (web3.currentProvider.isMetaMask) {
      this.setState({ isMetaMask: true });
      web3.currentProvider.publicConfigStore.on('update', response => {
        const { selectedAddress } = response;
        if (this.state.address !== selectedAddress) {
          this.setState({ address: selectedAddress, isReload: true }, () => {
            EventBus.dispatch(RELOAD_EVENT);
            this.loadData();
          });
        } else {
          this.setState({ isReload: false });
        }
      });
      this.loadData();
      await window.ethereum.enable();
    } else {
      this.setState({ isMetaMask: false });
    }
  }

  render() {
    let isSupportNetwork = false;
    if (Contract.getSupportedNetworks().indexOf(this.state.networkId) >= 0) {
      isSupportNetwork = true;
    }
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#FAFAFA'
        }}
      >
        {this.state.isMetaMask ? (
          !this.state.networkName ? (
            <div />
          ) : isSupportNetwork ? (
            <Routes />
          ) : (
            <UnSupportNetwork />
          )
        ) : (
          <DownloadMetamask />
        )}
      </div>
    );
  }
}

export default App;
