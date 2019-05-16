import React, { Component } from 'react';
import { message } from 'antd';
import styled from 'styled-components';
import numeral from 'numeral';
import Contract from '../services/Contract';
import ElectionList from '../components/ElectionList';
import EventBus from 'eventbusjs';

const RELOAD_EVENT = 'reload_data_event';

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 100;
  padding-top: 0px;
  background-color: rgb(250, 250, 250, 0.8);
  margin-bottom: 48px;
  @media screen and (min-width: 995px) {
    justify-content: space-between;
    margin-bottom: 0;
    padding-top: 32px;
  }
  user-select: none;
`;

const Headline = styled.h2`
  letter-spacing: 0.05em;
  ${({ theme }) => theme.headline()}
  color: white;
  text-transform: uppercase;
  margin: 0;
`;

const Title = styled.h2`
  letter-spacing: 0.05em;
  ${({ theme }) => theme.title()}
  color: white;
  text-transform: uppercase;
  margin: -5px 0px 0px 0px;
`;

const SubTitle = styled.h2`
  ${({ theme }) => theme.subTitle()}
  color: black;
  text-transform: uppercase;
  margin: 0;
`;

const Caption = styled.h2`
  ${({ theme }) => theme.caption()}
  color: #2D2A4A;
  text-transform: uppercase;
  margin: 0;
`;

const CaptionSmall = styled.h2`
  ${({ theme }) => theme.captionSmall()}
  color: #2D2A4A;
  margin: 0;
`;

const BackgroundHeadline = styled.div`
  background: black;
  color: white;
  padding: 9px 105px 9px 165px;
  clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%);
`;

const BackgroundSubTitle = styled.div`
  background: #bdbdbd;
  width: 82%;
  padding: 12px 78px 12px 165px;
  clip-path: polygon(0 0, 100% 0%, 95% 100%, 0% 100%);
  margin-bottom: 20px;
`;

const Divider = styled.div`
  background: black;
  height: 5px;
  margin-top: 10px;
`;

const LayoutTotalVote = styled.div`
  width: 475px;
  display: flex;
  justify-content: flex-end;
  @media screen and (min-width: 995px) {
    margin-top: -24px;
  }
`;

const Horizontal = styled.div`
  width: 100%;
  display: flex;
`;

class MainPage extends Component {
  state = {
    candidates: [],
    canVote: true,
    totalVoter: 0,
    votedCandidateId: 0,
    isVoting: false,
    votingCandidateId: -1
  };

  setupInstance = async () => {
    await Contract.setNetwork('4');
    this.election = Contract.Election();
  };

  getAllCandidate = async () => {
    const total = await this.election.methods.getTotalCandidate().call();
    return await Promise.all(
      Array.from({ length: total }, (_, i) => {
        return this.election.methods.getCandidate(i + 1).call();
      })
    );
  };

  loadData = async () => {
    const candidates = await this.getAllCandidate();
    // TODO: deploy new contract for fixbug
    const newItems = candidates.map(item => {
      if (item[2] === 'พรรคพลังประชารัฐ') {
        const logo = item[4];
        item[4] = item[3];
        item[3] = logo;
      }
      return item;
    });
    const canVote = await this.election.methods.checkUserCanVote().call();
    const totalVoter = await this.election.methods.getTotalVoter().call();
    const votedCandidateId = await this.election.methods
      .getVoterVotedCandidate()
      .call();
    this.setState({
      candidates: newItems,
      canVote,
      totalVoter: Number(totalVoter),
      votedCandidateId: Number(votedCandidateId),
      votingCandidateId: -1,
      isVoting: false
    });
  };

  subscribeEvents = () => {
    this.election.events.allEvents({}, (err, response) => {
      if (!err) {
        if (response.event === 'NewCandidateEvent') {
          this.loadData();
        } else if (response.event === 'VoteCandidateEvent') {
          message.success(`Vote successfully`);
          this.loadData();
        }
      } else {
        message.error('Something went wrong!');
      }
    });
  };

  handlerRealodData = async () => {
    if (this.state.isVoting) return;
    await this.setupInstance();
    this.loadData();
  };

  async componentDidMount() {
    EventBus.addEventListener(RELOAD_EVENT, this.handlerRealodData);
    await this.setupInstance();
    this.loadData();
    this.subscribeEvents();
  }

  componentWillUnmount() {
    EventBus.removeEventListener(RELOAD_EVENT, this.handlerRealodData);
  }

  handlerVote = async item => {
    this.setState({ isVoting: true, votingCandidateId: Number(item[0]) });
    try {
      const accounts = await window.ethereum.enable();
      await this.election.methods
        .vote(Number(item[0]))
        .send({ from: accounts[0] });
    } catch (err) {
      console.log('call me');
      const errorMessage = err.message.replace('Node error: ', '');
      try {
        message.error(JSON.parse(errorMessage).message);
      } catch (err) {
        message.warn("We can't get acccount wallet!");
      }
    }
    this.setState({ isVoting: false, votingCandidateId: -1 });
  };

  render() {
    return (
      <div style={{ paddingTop: '36px' }}>
        <Layout>
          <div>
            <BackgroundHeadline>
              <Headline>blockchain</Headline>
              <Title>voting system</Title>
            </BackgroundHeadline>
            <BackgroundSubTitle>
              <SubTitle>thailand election 2019</SubTitle>
            </BackgroundSubTitle>
          </div>
          <LayoutTotalVote>
            <div style={{ width: '100%' }}>
              <Horizontal
                style={{ justifyContent: 'center', alignItems: 'flex-end' }}
              >
                <SubTitle>voted</SubTitle>
                <Horizontal
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                  }}
                >
                  <Headline
                    style={{
                      color: 'black',
                      lineHeight: '40px',
                      marginRight: '32px'
                    }}
                  >
                    {numeral(this.state.totalVoter).format('0,0')}
                  </Headline>
                  <img
                    alt="counter icon"
                    src={require('./assets/ic_person_vote.svg')}
                  />
                </Horizontal>
              </Horizontal>
              <Divider />
              <Horizontal style={{ marginTop: '10px', marginLeft: '5px' }}>
                <div style={{ marginRight: '10px' }}>
                  <Caption>
                    11 list of man political parties in thailand
                  </Caption>
                  <CaptionSmall style={{ textAlign: 'end' }}>
                    This website has been developed for educational purposs
                    only.
                  </CaptionSmall>
                </div>
                <img
                  alt="thailand flag"
                  style={{ marginTop: '-14px' }}
                  src={require('./assets/ic_flag_thailand.svg')}
                />
              </Horizontal>
            </div>
          </LayoutTotalVote>
        </Layout>
        <ElectionList
          items={this.state.candidates}
          totalVoter={this.state.totalVoter}
          isVoting={this.state.isVoting}
          votingCandidateId={this.state.votingCandidateId}
          votedCandidateId={this.state.votedCandidateId}
          handlerVote={this.handlerVote}
        />
      </div>
    );
  }
}

export default MainPage;
