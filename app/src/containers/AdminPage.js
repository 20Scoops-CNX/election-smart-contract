import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import Contract from '../services/Contract';

class AdminPage extends Component {
  state = {
    isLoading: false,
    name: '',
    imageUrl: ''
  };

  componentDidMount() {
    Contract.setNetwork('1234567');
    this.election = Contract.Election();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.election.addCandidate(
      this.state.name,
      this.state.imageUrl,
      (err, res) => {
        console.log(res);
      }
    );
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onImageUrlChange = e => {
    this.setState({ imageUrl: e.target.value });
  };

  render() {
    return (
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <h2>Create Candidate</h2>
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
          style={{ width: '50%', marginTop: '30px' }}
        >
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Name"
              onChange={this.onNameChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Image URL"
              onChange={this.onImageUrlChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
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
