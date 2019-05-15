import React, { Component } from 'react';
import styled from 'styled-components';
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
  color: white;
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
  background: linear-gradient(90deg, #000000 0%, #383838 100%);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  justify-content: space-between;
  padding: 12px 16px 12px 16px;
  align-items: center;
  cursor: pointer;
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
  handlerClickVote = e => {
    console.log('vote');
  };

  render() {
    const item = this.props.item;
    if (item[2] === 'พรรคพลังประชารัฐ') {
      const logo = item[4];
      item[4] = item[3];
      item[3] = logo;
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
                <Percentag>99.99%</Percentag>
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
        <ButtonVote onClick={this.handlerClickVote}>
          <TextButton>Vote</TextButton>
          <img alt="vote icon" src={require('./assets/ic_vote.svg')} />
        </ButtonVote>
      </div>
    );
  }
}

export default ElectionItem;
