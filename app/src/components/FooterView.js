import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = styled.div`
  margin-top: 60px;
  user-select: none;
  margin-right: 150px;
  margin-left: 150px;
`;

const TextFooter = styled.h2`
  ${({ theme }) => theme.textFooter()}
  color: #2D2A4A;
  margin: 0;
`;

const TextFooterEng = styled.h2`
  ${({ theme }) => theme.textFooterEng()}
  color: #2D2A4A;
  margin: 0;
`;

const Horizontal = styled.div`
  width: 100%;
  display: flex;
`;

class FooterView extends Component {
  navigateToRef = e => {
    e.preventDefault();
    this.props.history.push('/references');
  };

  render() {
    return (
      <Footer>
        <div
          style={{
            height: '1px',
            backgroundColor: '#EEEEEE',
            marginBottom: '22px'
          }}
        />
        <Horizontal style={{ justifyContent: 'space-between' }}>
          <div>
            <Horizontal>
              <TextFooter style={{ marginBottom: '4px' }}>
                ขอบคุณที่ให้ความสนใจ /
              </TextFooter>
              <TextFooterEng style={{ marginLeft: '4px' }}>
                Thank you for your interest.
              </TextFooterEng>
            </Horizontal>
            <div style={{ display: 'flex' }}>
              <TextFooterEng style={{ fontWeight: '600', marginRight: '4px' }}>
                Contact:
              </TextFooterEng>{' '}
              <TextFooterEng>
                <a
                  href="mailto:cnx.democracy@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#A51931', cursor: 'pointer' }}
                >
                  cnx.democracy@gmail.com
                </a>
              </TextFooterEng>
            </div>
          </div>
          <Link
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
            to="references"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="counter icon"
              src={require('./assets/ic_reference.svg')}
              style={{ marginRight: '8px' }}
            />
            <TextFooterEng>Design References</TextFooterEng>
          </Link>
        </Horizontal>
      </Footer>
    );
  }
}

export default FooterView;
