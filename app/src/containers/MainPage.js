import React, { Component } from 'react';
import Contract from '../services/Contract';

const { web3 } = window;

class MainPage extends Component {
  componentDidMount() {
    Contract.setNetwork('1234567');
    this.election = Contract.Election();

    web3.eth.getAccounts((err, accounts) => {
      console.log(accounts);
    });

    this.election.getTotalCandidate((err, res) => {
      console.log(Number(res.s));
    });

    this.election.allEvents((err, response) => {
      if (!err) {
        if (response.event === 'NewCandidateEvent') {
          console.log('NewCandidateEvent');
        } else if (response.event === 'VoteCandidateEvent') {
          console.log('VoteCandidateEvent');
        }
      } else {
        // TODO: handler error
      }
    });
  }

  render() {
    return <div>MainPage</div>;
  }
}

export default MainPage;
