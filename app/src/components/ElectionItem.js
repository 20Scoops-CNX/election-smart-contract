import React, { Component } from 'react';
import styled from 'styled-components';
import 'loaders.css';
import Loader from 'react-loaders';
import numeral from 'numeral';
import FadeImage from './FadeImage';

const TitleContent = styled.h2`
  ${({ theme }) => theme.titleContent()}
  color: #202124;
  margin: 0;
`;

const SubTitleContent = styled.h2`
  ${({ theme }) => theme.subTitleContent()}
  color: #202124;
  margin: 2px 0px 0px 0px;
`;

const Percentag = styled.h2`
  ${({ theme }) => theme.titleSmallContent()}
  color: #BDBDBD;
  margin: 2px 0px 0px 0px;
`;

const Counter = styled.h2`
  ${({ theme }) => theme.textSmallContent()}
  color: #BDBDBD;
  margin: 2px 0px 0px 0px;
`;

const TextButton = styled.h2`
  ${({ theme }) => theme.button()}
  margin: 0px;
  text-transform: uppercase;
`;

const LoaderWrapper = styled.div`
  height: 20px;
  .loader-inner.ball-pulse div {
    width: 8px;
    height: 8px;
    margin-top: 7px;
  }
`;

const ButtonVote = styled.button`
  position: absolute;
  width: 204px;
  display: flex;
  outline: none;
  height: 44px;
  bottom: 0;
  border: 0;
  right: 0;
  border-radius: 2px;
  padding: 12px 16px 12px 16px;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const ImageShadow = styled(FadeImage)`
  background-color: white;
  width: 64px;
  height: 64px;
  position: absolute;
  margin: -18px 0px 10px 16px;
  -webkit-box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

const LinearLayout = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

class ElectionItem extends Component {
  handlerClickVote = item => {
    this.props.handlerVote(item);
  };

  render() {
    const isVoting = this.props.isVoting;
    const votingCandidateId = this.props.votingCandidateId;
    const item = this.props.item;
    const totalVoter = this.props.totalVoter;
    const percentage = numeral(Number(item[5]))
      .divide(totalVoter)
      .multiply(100)
      .format('0[.]00');
    const votedCandidateId = this.props.votedCandidateId;
    let isShowButtonVote = true;
    let isVoted = false;
    if (votedCandidateId === 0) {
      isShowButtonVote = true;
    } else if (votedCandidateId > 0 && votedCandidateId === Number(item[0])) {
      isShowButtonVote = true;
      isVoted = true;
    } else {
      isShowButtonVote = false;
    }
    let disableVote = isVoted;
    if (isVoted) {
      disableVote = true;
    } else {
      disableVote = isVoting;
    }
    return (
      <div
        style={{
          width: '324px',
          height: '164px',
          position: 'relative',
          userSelect: 'none'
        }}
      >
        <div
          style={{
            height: '100%',
            marginRight: '4px',
            backgroundColor: '#FFFFFF'
          }}
        >
          <ImageShadow src={item[3]} preSrc={item[3]} />
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: '16px'
            }}
          >
            <div style={{ height: '100%', width: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '36%',
                  width: '100%'
                }}
              >
                <TitleContent>{item[2]}</TitleContent>
                <SubTitleContent>{item[1]}</SubTitleContent>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  marginBottom: '10px'
                }}
              >
                <Percentag>{`${percentage}%`}</Percentag>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    alt="count icon"
                    style={{ marginRight: '4px', marginTop: '1px' }}
                    src={require('./assets/ic_person.svg')}
                  />
                  <Counter>{Number(item[5])}</Counter>
                </div>
              </div>
            </div>
            <div
              style={{
                height: '100%',
                width: '120px',
                flexShrink: '0'
              }}
            >
              <FadeImage
                fit="cover"
                alt="candidate"
                src={item[4]}
                preSrc={require('./assets/ic_bg.svg')}
                imageWidth={120}
                imageHeight={isShowButtonVote ? 120 : 164}
              />
            </div>
          </div>
        </div>
        <ButtonVote
          disabled={disableVote ? true : false}
          style={{
            cursor: disableVote ? 'auto' : 'pointer',
            display: isShowButtonVote ? 'block' : 'none',
            boxShadow: isVoted ? '0px' : '0px 2px 8px rgba(0, 0, 0, 0.25)',
            background: isVoted
              ? '#BDBDBD'
              : 'linear-gradient(90deg, #000000 0%, #383838 100%)'
          }}
          onClick={() => {
            this.handlerClickVote(item);
          }}
        >
          <LinearLayout>
            <LoaderWrapper
              style={{
                display:
                  isVoting && !isVoted && votingCandidateId === Number(item[0])
                    ? 'block'
                    : 'none'
              }}
            >
              <Loader type="ball-pulse" active />
            </LoaderWrapper>
            <LinearLayout
              style={{
                justifyContent: 'space-between',
                display:
                  isVoting && !isVoted && votingCandidateId === Number(item[0])
                    ? 'none'
                    : 'flex'
              }}
            >
              <TextButton style={{ color: isVoted ? '#DEDEDE' : 'white' }}>
                {isVoted ? 'Voted' : 'Vote'}
              </TextButton>
              <img
                alt="vote icon"
                src={require(isVoted
                  ? './assets/ic_voted.svg'
                  : './assets/ic_vote.svg')}
              />
            </LinearLayout>
          </LinearLayout>
        </ButtonVote>
      </div>
    );
  }
}

export default ElectionItem;
