import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { AuthContext } from "../../context";
import "./Login.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import { AuthenApi } from "../../services/AuthenApi";
import { Notification } from "../../services/Notification";
import LayoutLogin from "./LayoutLogin";

export class LoginNew extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.AuthenApi = new AuthenApi();
    this.Notification = new Notification();
  }

  state = {
    loading: false
  };

  forgotPassword = () => {
    this.props.history.push("/ForgotPassword")
  }

  register = () => {
    this.props.history.push("/Register");
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.AuthenApi.login(values).then(res => {
          this.setState({ loading: false });
          if (res && res.access_token) {
            localStorage.setItem(process.env.REACT_APP_Token_Name, JSON.stringify(res));
            this.context.onLogin();
            this.props.history.push('/');
          } else {
            this.Notification.error("Sai tên đăng nhập hoặc mật khẩu");
          }
        }).catch(err => {
          this.setState({ loading: false });
          this.Notification.error("Sai tên đăng nhập hoặc mật khẩu");
        });
      }
      else {
        this.Notification.error("Sai tên đăng nhập hoặc mật khẩu");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LayoutLogin title="Đăng nhập">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon
                    type="user"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="Tên tài khoản"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon
                    type="lock"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                type="password"
                placeholder="Mật khẩu"
              />
            )}
          </Form.Item>
          <Form.Item>
            <div>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={this.state.loading}
            >
              Log in
            </Button>
            <div>
              <a href="/ForgotPassword">
                <Button type="link">Quên mật khẩu?</Button>
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

export default Form.create({ name: 'normal_login' })(withRouter(LoginNew));
