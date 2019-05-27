import React, { Component } from 'react';
import { message } from 'antd';
import styled from 'styled-components';
import Contract from '../services/Contract';
import ElectionList from '../components/ElectionList';
import EventBus from 'eventbusjs';
import CountUp from 'react-countup';
import { RELOAD_EVENT } from '../constant/Event';
import { KEY_VOTING } from '../constant/Key';
import { CONTRACT_ADDRESS_URL } from '../constant/Value';
import FooterView from '../components/FooterView';

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
  text-align: end;
`;

const BackgroundHeadline = styled.div`
  background: black;
  color: white;
  display: flex;
  position: relative;
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
    await Contract.setNetwork('3');
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

  setDataUserVoting = candidateId => {
    localStorage.setItem(
      KEY_VOTING,
      JSON.stringify({
        isVoting: true,
        candidateId: candidateId
      })
    );
  };

  clearLocalStorage = () => {
    localStorage.removeItem(KEY_VOTING);
  };

  loadData = async () => {
    const candidates = await this.getAllCandidate();
    const canVote = await this.election.methods.checkUserCanVote().call();
    const totalVoter = await this.election.methods.getTotalVoter().call();
    const votedCandidateId = await this.election.methods
      .getVoterVotedCandidate()
      .call();
    let isVoting = false;
    let votingCandidateId = -1;
    if (Number(votedCandidateId) === 0) {
      const jsonStr = localStorage.getItem(KEY_VOTING);
      if (jsonStr) {
        const data = JSON.parse(jsonStr);
        if (data.isVoting) {
          isVoting = data.isVoting;
          votingCandidateId = data.candidateId;
        }
      }
    } else {
      this.clearLocalStorage();
    }
    this.setState({
      candidates: candidates,
      canVote,
      totalVoter: Number(totalVoter),
      votedCandidateId: Number(votedCandidateId),
      votingCandidateId: votingCandidateId,
      isVoting: isVoting
    });
  };

  subscribeEvents = () => {
    this.election.events.allEvents({}, (err, response) => {
      if (!err) {
        if (response.event === 'NewCandidateEvent') {
          this.loadData();
        } else if (response.event === 'VoteCandidateEvent') {
          message.success('New transaction for voted');
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
      const candidateId = Number(item[0]);
      this.setDataUserVoting(candidateId);
      await this.election.methods.vote(candidateId).send({ from: accounts[0] });
    } catch (err) {
      this.clearLocalStorage();
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
      <div
        style={{
          paddingTop: '36px',
          paddingBottom: '24px',
          background: '#FAFAFA',
          minHeight: '100vh'
        }}
      >
        <Layout>
          <div>
            <BackgroundHeadline>
              <img
                alt="app icon"
                width="96px"
                height="96px"
                style={{
                  position: 'absolute',
                  left: '0px',
                  marginTop: '12px',
                  marginLeft: '46px'
                }}
                src={require('./assets/ic_app.png')}
              />
              <div style={{ display: 'flex' }}>
                <div>
                  <Headline>blockchain</Headline>
                  <Title>voting system</Title>
                </div>
              </div>
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
                    <CountUp
                      className="account-balance"
                      start={0}
                      end={this.state.totalVoter}
                      separator=","
                    />
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
                  <CaptionSmall>
                    This website has been developed for educational purposs
                    only.
                  </CaptionSmall>
                  <CaptionSmall style={{ marginTop: '2px' }}>
                    Address:{' '}
                    <a
                      style={{ color: '#2D2A4A' }}
                      href={CONTRACT_ADDRESS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <u>0x5F81B9525e9f4b1CF3514364eb6a2F454e61ab2e</u>
                    </a>
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
        {this.state.candidates.length > 0 ? <FooterView /> : <div />}
      </div>
    );
  }
}

export default MainPage;
