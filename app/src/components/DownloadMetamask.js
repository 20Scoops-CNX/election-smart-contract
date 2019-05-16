import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModelViewer from 'metamask-logo';
import { detect } from 'detect-browser';
import { message } from 'antd';

const browser = detect();

const Wrapper = styled.div`
  text-align: center;
  user-select: none;
`;

const WrapperContent = styled.div`
  width: 540px;
  padding: 24px 95px 32px 95px;
  background-color: #ffffff;
  border-radius: 4px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #e8e8e8;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: 350px;
  height: 50px;
  cursor: pointer;
`;

const ButtonDownload = styled(Button)`
  background: #ef8733;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
`;

const ButtonReadMe = styled(Button)`
  background: linear-gradient(90deg, #000000 0%, #383838 100%);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const TextButton = styled.h2`
  ${({ theme }) => theme.caption()}
  margin: 0;
  color: white;
  text-transform: uppercase;
`;

const TextCaption = styled.h2`
  ${({ theme }) => theme.subTitleContent()}
  margin: 0;
  color: #202124;
  padding: 16px 0px 24px 0px;
  text-align: start;
  line-height: 18px;
`;

const Space32 = styled.div`
  height: 32px;
`;

const Title = styled.h2`
  ${({ theme }) => theme.title()}
  color: #E4761B;
  margin: 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const TitleContent = styled.h2`
  ${({ theme }) => theme.subTitle()}
  color: #000000;
  letter-spacing: 0.05em;
  margin: 0;
  text-transform: uppercase;
`;

const onNavigateToInstallMetaMask = () => {
  let url = '';
  switch (browser && browser.name) {
    case 'chrome':
      url =
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
      break;
    case 'firefox':
      url = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask';
      break;
    case 'opera':
      url = 'https://addons.opera.com/en/extensions/details/metamask';
      break;
    default:
      console.log('not supported');
  }
  if (url) {
    window.open(`${url}`, '_blank');
  } else {
    message.warn('This browser is not supported');
  }
};

class DownloadMetamask extends Component {
  render() {
    const logoMetamask = ModelViewer({
      pxNotRatio: true,
      width: 200,
      height: 200,
      followMouse: true,
      followMotion: true
    });
    return (
      <div style={{ backgroundColor: '#FAFAFA', padding: '40px 0px 40px 0px' }}>
        <Wrapper>
          <div>
            <div
              ref={view =>
                view ? view.appendChild(logoMetamask.container) : <div />
              }
            />
          </div>
          <Title style={{ marginBottom: '36px' }}>
            required metamask for access
          </Title>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
          >
            <WrapperContent>
              <TitleContent>download metamask</TitleContent>
              <TextCaption>
                MetaMask เป็นกระเป๋าเงิน Ethereum แบบออนไลน์
                ที่สามารถใช้งานผ่านเว็บบราวเซอร์ได้หลากหลาย ไม่ว่าจะเป็น Google
                Chrome, Opera, Firefox รวมถึง Brave
                และยังเป็นเครื่องมือที่จำเป็นสำหรับผู้ที่ต้องการใช้งาน DApp หรือ
                Decentralized Application อีกด้วย
              </TextCaption>
              <ButtonDownload onClick={onNavigateToInstallMetaMask}>
                <TextButton>download</TextButton>
              </ButtonDownload>
              <Space32 />
              <Divider />
              <Space32 />
              <TitleContent>i don't know how to use it</TitleContent>
              <TextCaption>
                หากคุณต้องการคำแนะนำเพิ่มเติมเกี่ยวกับขั้นตอนการติดตั้ง
                และวิธีการใช้งาน MetaMask Wallet รวมไปถึงวิธีการใช้งาน DApp
                Blockchain Voting System ของเรา
                เราได้รวบรวมข้อมูลที่จำเป็นไว้เพื่อคุณ
                สามารถเข้าไปอ่านรายละเอียดเพิ่มเติมได้จากลิ้งค์ด้านล่างนี้
              </TextCaption>
              <ButtonReadMe>
                <TextButton>read document</TextButton>
                <Link
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: 'transparent'
                  }}
                  to="document"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </ButtonReadMe>
            </WrapperContent>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default DownloadMetamask;
