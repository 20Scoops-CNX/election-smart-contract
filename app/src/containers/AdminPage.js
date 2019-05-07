import React, { Component } from 'react';
import Contract from '../services/Contract';

class AdminPage extends Component {
  componentDidMount() {
    Contract.setNetwork('1234567');
    this.election = Contract.Election();
  }

  render() {
    return <div />;
  }
}

export default AdminPage;
