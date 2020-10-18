import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../context";
import AuthenApi from '../../services/AuthenApi';
import Notification from '../../services/Notification';
import { validateEmail } from '../utility';
import LayoutLogin from './LayoutLogin';

export class ForgotPassword extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.AuthenApi = new AuthenApi();
    this.Notification = new Notification();
  }

  state = {
    loading: false,
    email: {
      data: undefined,
      validateStatus: "success",
      help: ''
    }
  };

  onEmailChange = val => {
    if (val) {
      this.setState({
        email: {
          data: val,
          validateStatus: 'success',
          help: ''
        }
      })
    }
    else {
      this.setState({
        email: {
          data: val,
          validateStatus: 'error',
          help: 'Please input your email'
        }
      })
    }
  }

  handleSubmit = () => {
    if (!this.validateStatus()) {
      return;
    }

    if (!validateEmail(this.state.email.data)) {
      this.setState({
        email: {
          validateStatus: 'error',
          help: 'Email is invalid'
        }
      })
      return;
    }

    //reset password
  };

  validateStatus = () => {
    var email = { ...this.state.email }
    if (this.state.email.data) {
      email.validateStatus = 'success';
      email.help = ''
    }
    else {
      email.validateStatus = 'error';
      email.help = 'Please input your email';
    }
    this.setState({ email });
    return email.data && email.data.length > 0;
  }

  render() {
    return (
      <LayoutLogin title="Reset mật khẩu">
        <Form className="login-form">
          <Form.Item {...this.state.email}>
            <Input onChange={e => this.onEmailChange(e.target.value)} value={this.state.email.data} placeholder="Nhập địa chỉ email" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="login-form-button"
              loading={this.state.loading}
              onClick={this.handleSubmit}
            >
              Reset mật khẩu
            </Button>
            <div>
              <a href="/">
                <Button type="link">Đăng nhập?</Button>
              </a>
              <a href="/Register">
                <Button type="link">Chưa có tài khoản?</Button>
              </a>
            </div>
          </Form.Item>
        </Form>
      </LayoutLogin>
    );
  }
}
export default withRouter(ForgotPassword);