import React, { Component } from 'react';
import { Icon, Tag } from 'antd';
import './App.css';
import Routes from './containers/Routes';
import Contract from './services/Contract';

const { web3 } = window;

const { CheckableTag } = Tag;

class App extends Component {
  state = {
    networkName: 'Loading...',
    networkId: '',
    address: '',
    isMetaMask: false
  };

  async componentDidMount() {
    Contract.registerBus();
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

  componentWillUnmount() {
    Contract.unregisterBus();
  }

  onNavigateToInstallMetaMask = () => {
    window.open(
      'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      '_blank'
    );
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {this.state.isMetaMask ? (
          <div>
            <div
              style={{
                height: '46px',
                background: 'black',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  height: '56px',
                  marginLeft: '16px',
                  color: 'white',
                  fontSize: '24px',
                  marginTop: '15px'
                }}
              >
                Election
              </div>
              <CheckableTag checked={true}>
                <div style={{ padding: '3px', fontSize: '12px' }}>
                  <Icon type="api" /> Network: {this.state.networkName}
                </div>
              </CheckableTag>
            </div>
            <Routes />
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <img
              style={{ height: '100px', cursor: 'pointer' }}
              src="ic_download_metamask.png"
              alt="icon download metamask"
              onClick={this.onNavigateToInstallMetaMask}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
