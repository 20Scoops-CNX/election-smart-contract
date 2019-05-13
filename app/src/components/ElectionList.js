import React, { Component } from 'react';
import styled from 'styled-components';
import ElectionItem from './ElectionItem';

const Layout = styled.div`
  will-change: transform;
  margin: 20px 16px 16px 16px;
`;

class ElectionList extends Component {
  render() {
    return (
      <Layout>
        {Array.from({ length: 12 }, (x, i) => {
          return <ElectionItem />;
        })}
      </Layout>
    );
  }
}

export default ElectionList;
