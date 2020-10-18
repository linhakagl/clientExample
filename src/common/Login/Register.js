import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';
import { AuthContext } from "../../context";
import AuthenApi from '../../services/AuthenApi';
import Notification from '../../services/Notification';
import { Link, withRouter, Redirect } from "react-router-dom";
import { validateEmail } from '../utility';
import UsersApi from '../../services/UsersApi';
import LayoutLogin from './LayoutLogin';

export class Register extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.AuthenApi = new AuthenApi();
    this.Notification = new Notification();
  }

  state = {
    loading: false,
    data: {
      account: {
        data: undefined,
        validateStatus: '',
        help: ''
      },
      email: {
        data: undefined,
        validateStatus: '',
        help: ''
      },
      password: {
        data: undefined,
        validateStatus: '',
        help: ''
      },
      confirmPassword: {
        data: undefined,
        validateStatus: '',
        help: ''
      }
    }
  };

  handleSubmit = async () => {
    if (!this.validateEmail()) {
      return;
    }
    if (!this.validateStatus()) {
      return;
    }

    //register
    var data = { ...this.state.data };
    var newUser = {
      account: data.account.data,
      email: data.email.data,
      password: data.password.data,
      domain: 'mFb.vn'
    }
    var res = await UsersApi.register(newUser);
    if (res) {
      if (res.status === 200 && res.data) {
        if (res.data === "Domain không tồn tại") {
          this.Notification.error(res.data);
          return;
        }
        this.Notification.success("Tạo tài khoản thành công");
        return <Redirect to='/login' />;
      }
      else {
        this.Notification.error(res.message);
      }
    }
    else {
      this.Notification.error('Api Connection Error');
    }
  };

  validateEmail = () => {
    if (!validateEmail(this.state.data.email.data)) {
      var data = { ...this.state.data };
      data.email.validateStatus = 'error';
      data.email.help = 'Email không hợp lệ';
      this.setState({ data });
      return false;
    }
    return true;
  }

  onChangeData = (value, field) => {
    var data = { ...this.state.data };
    data[field].data = value;
    data[field].validateStatus = '';
    data[field].help = '';
    this.setState({ data });
  }


  validateStatus = () => {
    var data = { ...this.state.data };
    var valid = true;
    if (!data.account.data) {
      data.account.validateStatus = 'error';
      data.account.help = 'Nhập tên tài khoản';
      valid = false;
    }
    if (!data.email.data) {
      data.email.validateStatus = 'error';
      data.email.help = 'Nhập email';
      valid = false;
    }
    if (!data.password.data) {
      data.password.validateStatus = 'error';
      data.password.help = 'Nhập mật khẩu';
      valid = false;
    }
    if (!data.confirmPassword.data) {
      data.confirmPassword.validateStatus = 'error';
      data.confirmPassword.help = 'Nhập mật khẩu xác nhận';
      valid = false;
    }
    if (valid && data.confirmPassword !== data.password) {
      data.confirmPassword.validateStatus = 'error';
      data.confirmPassword.help = 'Mật khẩu và mật khẩu không khớp';
      valid = false;
    }
    if (!valid) {
      this.setState({ data });
    }
    return valid;
  }

  render() {
    return (
      <LayoutLogin title="Đăng ký tài khoản">
        <Form className="login-form">
          <Form.Item {...this.state.data.account}>
            <Input
              onChange={e => this.onChangeData(e.target.value, 'account')}
              value={this.state.data.account.data}
              placeholder="Tên tài khoản"
            />
          </Form.Item>
          <Form.Item {...this.state.data.email}>
            <Input
              onChange={e => this.onChangeData(e.target.value, 'email')}
              value={this.state.data.email.data}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item {...this.state.data.password}>
            <Input.Password
              onChange={e => this.onChangeData(e.target.value, 'password')}
              value={this.state.data.password.data}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item {...this.state.data.confirmPassword}>
            <Input.Password
              onChange={e => this.onChangeData(e.target.value, 'confirmPassword')}
              value={this.state.data.confirmPassword.data}
              placeholder="Mật khẩu xác nhận"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="login-form-button"
              loading={this.state.loading}
              onClick={this.handleSubmit}
            >
              Đăng ký
            </Button>
            <div>
              <a href="/login">
                <Button type="link">Bạn đã có tài khoản?</Button>
              </a>
            </div>
          </Form.Item>
        </Form>
      </LayoutLogin>
    );
  }
}
export default withRouter(Register);