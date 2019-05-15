import React, { Component } from 'react';
import './App.css';
import Routes from './containers/Routes';
import styled from 'styled-components';
import Contract from './services/Contract';

const { web3 } = window;

const LayoutCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
  user-select: none;
`;

class App extends Component {
  state = {
    networkName: '',
    networkId: '',
    address: '',
    isMetaMask: false
  };

  async componentDidMount() {
    if (!web3) return;

    if (web3.currentProvider.isMetaMask) {
      this.setState({ isMetaMask: true });
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

      web3.eth.getAccounts((err, accounts) => {
        this.setState({ address: accounts[0] });
        web3.currentProvider.publicConfigStore.on('update', response => {
          const { selectedAddress } = response;
          if (this.state.address !== selectedAddress) {
            this.setState({ address: selectedAddress }, () => {
              window.location.reload();
            });
          }
        });
      });
    } else {
      this.setState({ isMetaMask: false });
    }
  }

  onNavigateToInstallMetaMask = () => {
    window.open(
      'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      '_blank'
    );
  };

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
            <div>
              <div style={{ paddingTop: '36px' }} />
              <Routes />
            </div>
          ) : (
            <LayoutCenter>
              <h1>Not support this network</h1>
            </LayoutCenter>
          )
        ) : (
          <LayoutCenter>
            <img
              style={{ height: '100px', cursor: 'pointer' }}
              src="ic_download_metamask.png"
              alt="icon download metamask"
              onClick={this.onNavigateToInstallMetaMask}
            />
          </LayoutCenter>
        )}
      </div>
    );
  }
}

export default App;
