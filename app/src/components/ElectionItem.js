import React, { Component } from 'react';
import styled from 'styled-components';
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
  margin: 2px 0px 0px 0px;
  text-transform: uppercase;
`;

const ButtonVote = styled.div`
  position: absolute;
  width: 204px;
  display: flex;
  height: 44px;
  bottom: 0;
  right: 0;
  border-radius: 2px;
  justify-content: space-between;
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

class ElectionItem extends Component {
  handlerClickVote = item => {
    this.props.handlerVote(item);
  };

  render() {
    const item = this.props.item;
    const totalVoter = this.props.totalVoter;
    const percentage = numeral(Number(item[5]))
      .divide(totalVoter)
      .multiply(100)
      .format('0[.]00');
    const votedCandidateId = this.props.votedCandidateId;
    let isShowButtonVote = true;
    let isVoted = false;
    if (votedCandidateId === -1) {
      isShowButtonVote = true;
    } else if (votedCandidateId > 0 && votedCandidateId === Number(item[0])) {
      isShowButtonVote = true;
      isVoted = true;
    } else {
      isShowButtonVote = false;
    }
    return (
      <div
        style={{
          width: '324px',
          height: '164px',
          position: 'relative'
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
            <div style={{ height: '100%', width: '120px', flexShrink: '0' }}>
              <FadeImage
                alt="candidate"
                src={item[4]}
                preSrc={item[4]}
                imageWidth={120}
                imageHeight={120}
              />
            </div>
          </div>
        </div>
        <ButtonVote
          style={{
            display: isShowButtonVote ? 'flex' : 'none',
            boxShadow: isVoted ? '0px' : '0px 2px 8px rgba(0, 0, 0, 0.25)',
            background: isVoted
              ? '#BDBDBD'
              : 'linear-gradient(90deg, #000000 0%, #383838 100%)'
          }}
          onClick={() => {
            this.handlerClickVote(item);
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
        </ButtonVote>
      </div>
    );
  }
}

export default ElectionItem;
