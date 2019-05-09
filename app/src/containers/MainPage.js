import React, { Component } from 'react';
import { Card, List, Button, message } from 'antd';
import Contract from '../services/Contract';

const { Meta } = Card;

class MainPage extends Component {
  state = {
    candidates: [],
    canVote: true,
    isLoading: false,
    btnId: -1
  };

  getAllCandidate = async () => {
    const total = await this.election.methods.getTotalCandidate().call();
    return await Promise.all(
      Array.from({ length: total }, (x, i) => {
        return this.election.methods.getCandidate(i + 1).call();
      })
    );
  };

  loadData = async () => {
    const candidates = await this.getAllCandidate();
    const canVote = await await this.election.methods.checkUserCanVote().call();
    console.log(candidates);
    console.log(canVote);
    this.setState({ candidates, canVote });
  };

  subscribeEvents = () => {
    this.election.events.allEvents({}, (err, response) => {
      if (!err) {
        if (response.event === 'NewCandidateEvent') {
          this.loadData();
        } else if (response.event === 'VoteCandidateEvent') {
          this.loadData();
        }
      } else {
        // TODO: handler error
      }
    });
  };

  async componentDidMount() {
    await Contract.setNetwork('1234567');
    this.election = Contract.Election();
    this.loadData();
    this.subscribeEvents();
  }

  onClickVote = async item => {
    this.setState({ isLoading: true, btnId: Number(item[0]) });
    try {
      const tx = await this.election.methods.vote(Number(item[0])).send();
      message.success(tx.transactionHash);
      console.log(tx);
    } catch (err) {
      message.error(err.message);
    }
    this.setState({ isLoading: false, btnId: -1 });
  };

  render() {
    return (
      <div style={{ margin: '16px' }}>
        <h2>Total Voter: 9,999</h2>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3
          }}
          dataSource={this.state.candidates}
          renderItem={item => (
            <List.Item>
              <Card
                cover={
                  <img
                    style={{
                      width: 'auto',
                      height: '280px',
                      objectFit: 'contain'
                    }}
                    alt="candidate"
                    src={item[4]}
                  />
                }
                actions={[
                  <div>
                    <Button
                      loading={
                        this.state.btnId === Number(item[0])
                          ? this.state.isLoading
                          : false
                      }
                      disabled={!this.state.canVote}
                      type="primary"
                      style={{ width: '250px' }}
                      onClick={() => {
                        this.onClickVote(item);
                      }}
                    >
                      Vote
                    </Button>
                  </div>
                ]}
              >
                <Meta
                  avatar={
                    <div
                      style={{
                        overflow: 'hidden',
                        borderRadius: '40px',
                        padding: '5px',
                        boxShadow: '1px 1px 1px gray',
                        width: '46px',
                        height: '46px',
                        border: '1px solid rgba(0,0,0,0.1)'
                      }}
                    >
                      <img
                        alt="logo"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                        src={item[3]}
                      />
                    </div>
                  }
                  title={item[1]}
                  description={item[2]}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default MainPage;
