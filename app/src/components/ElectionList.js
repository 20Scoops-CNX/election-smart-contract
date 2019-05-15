import React, { Component } from 'react';
import styled from 'styled-components';
import ElectionItem from './ElectionItem';

const Layout = styled.div`
  will-change: transform;
  margin: 300px 16px 16px 16px;
  justify-content: center;
  grid-template-rows: auto;
  grid-column-gap: 84px;
  grid-row-gap: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 324px);
  @media screen and (min-width: 995px) {
    margin: 220px 16px 16px 16px;
  }
`;

class ElectionList extends Component {
  render() {
    const totalVoter = this.props.totalVoter;
    return (
      <Layout>
        {this.props.items.map(item => {
          return (
            <ElectionItem
              item={item}
              totalVoter={totalVoter}
              isVoting={this.props.isVoting}
              votingCandidateId={this.props.votingCandidateId}
              handlerVote={this.props.handlerVote}
              votedCandidateId={this.props.votedCandidateId}
              key={Number(item[0])}
            />
          );
        })}
      </Layout>
    );
  }
}

export default ElectionList;
