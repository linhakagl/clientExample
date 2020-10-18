import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
import { AuthContext } from "../../context";
import './Login.css'
import { AuthenApi } from '../../services/AuthenApi'
import { Notification } from '../../services/Notification'

export class Login extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.AuthenApi = new AuthenApi();
    this.Notification = new Notification();
  }

  state = {
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        this.AuthenApi.login(values).then(res => {

          this.setState({ loading: false });
          if (res && res.access_token) {
            localStorage.setItem(process.env.REACT_APP_Token_Name , JSON.stringify(res));
            this.context.onLogin();
          } else {
            this.Notification.error("Wrong username or password")
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ background: "#ECECEC", height: "100vh" }}>
        <div style={{ width: 400, margin: "0 auto", paddingTop: "180px" }}>
          <Card title="Account Login" className='login-card'>
            <div className="login-form">
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
                      placeholder="Username"
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
                      placeholder="Password"
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
                </Form.Item>
              </Form>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: "normal_login" })(Login);
