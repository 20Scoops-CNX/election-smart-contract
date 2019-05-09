import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import Contract from '../services/Contract';

class AdminPage extends Component {
  state = {
    isLoading: false,
    name: '',
    politicalPartyName: '',
    logoUrl: '',
    imageUrl: ''
  };

  async componentDidMount() {
    await Contract.setNetwork('1234567');
    this.election = Contract.Election();
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    try {
      const tx = await this.election.methods
        .addCandidate(
          this.state.name,
          this.state.politicalPartyName,
          this.state.logoUrl,
          this.state.imageUrl
        )
        .send();
      this.setState({ isLoading: false });
      message.success(tx.transactionHash);
    } catch (err) {
      this.setState({ isLoading: false });
      message.error(err.message);
    }
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onImageUrlChange = e => {
    this.setState({ imageUrl: e.target.value });
  };

  onPoliticalPartyNameChange = e => {
    this.setState({ politicalPartyName: e.target.value });
  };

  onLogoUrlChange = e => {
    this.setState({ logoUrl: e.target.value });
  };

  render() {
    return (
      <div
        style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}
      >
        <h1 style={{ width: '100%', textAlign: 'center', marginTop: '30px' }}>
          Create Candidate
        </h1>
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
          style={{ width: '35%' }}
        >
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Name"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={
                <Icon type="crown" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Political Party Name"
              value={this.state.politicalPartyName}
              onChange={this.onPoliticalPartyNameChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={
                <Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Logo URL"
              value={this.state.logoUrl}
              onChange={this.onLogoUrlChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={
                <Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Image URL"
              value={this.state.imageUrl}
              onChange={this.onImageUrlChange}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              style={{ width: '40%' }}
              loading={this.state.isLoading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AdminPage;
