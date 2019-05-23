import React, { Component } from 'react';
import styled from 'styled-components';
import ModelViewer from 'metamask-logo';

const LayoutCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #fafafa;
  user-select: none;
`;

const Wrapper = styled.div`
  text-align: center;
  user-select: none;
`;

const WrapperContent = styled.div`
  width: 540px;
  padding: 16px 95px 16px 95px;
  background-color: #ffffff;
  border-radius: 4px;
`;

const TextCaption = styled.h2`
  ${({ theme }) => theme.subTitleContent()}
  margin: 0;
  color: #202124;
  padding: 8px 0px 8px 0px;
  text-align: center;
  line-height: 18px;
`;

const Title = styled.h2`
  ${({ theme }) => theme.title()}
  color: #E4761B;
  margin: 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

class UnSupportNetwork extends Component {
  state = {
    isAddedLogoMetaMask: false
  };

  addLogoMetaMask = view => {
    if (this.state.isAddedLogoMetaMask) return;
    const logoMetaMask = ModelViewer({
      pxNotRatio: true,
      width: 200,
      height: 200,
      followMouse: true,
      followMotion: true
    });
    view.appendChild(logoMetaMask.container);
    this.setState({ isAddedLogoMetaMask: true });
  };

  render() {
    return (
      <LayoutCenter>
        <Wrapper>
          <div>
            <div ref={view => (view ? this.addLogoMetaMask(view) : <div />)} />
          </div>
          <Title style={{ marginBottom: '20px' }}>change your network</Title>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
          >
            <WrapperContent>
              <TextCaption>
                เกิดข้อผิดพลาด! เนื่องจากระบบไม่รองรับเครือข่ายของ MetaMask
                ที่คุณเลือกไว้ในขณะนี้ กรุณาเปลี่ยนเครือข่ายของคุณเป็น{' '}
                <b>‘Ropsten’</b>
                เพื่อให้รองรับการใช้งานของระบบ
              </TextCaption>
              <div
                style={{
                  width: '100%',
                  height: '315px',
                  marginTop: '16px',
                  flexShrink: '0'
                }}
              >
                <img
                  alt="network"
                  style={{ width: 'auto', height: '100%' }}
                  src={require('./assets/ic_network_ropsten.svg')}
                />
              </div>
            </WrapperContent>
          </div>
        </Wrapper>
      </LayoutCenter>
    );
  }
}

export default UnSupportNetwork;
