import React, { useRef } from 'react'
import { Modal, Button, Form, Input } from 'antd'
import UsersApi from '../../services/UsersApi';
import Notification from '../../services/Notification';

function ChangePasswordDialog(props) {
  const newPassword = useRef(null);
  const confirmPassword = useRef(null);
  const currentPassword = useRef(null);

  function checkConfirmPassword(rule, value, callback) {
    if (value === newPassword.current.props.value) {
      return callback();
    }
    callback('Mật khẩu không khớp!');
  }

  function handleSubmit(){
    props.form.validateFields(async (err, values) => {
      if (!err) {
        if(props.onOk){
          props.onOk(values);
        }
      }
    })
  }

  const { getFieldDecorator } = props.form;
  return (
    <Modal
      footer={[
        <Button key="submit"
          style={{ marginRight: 15 }}
          type="primary"
          onClick={handleSubmit}
        >
          OK
        </Button>,
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>
      ]}
      onCancel={props.onCancel}
      title="Đổi mật khẩu"
      visible={true}
    >
      <Form
        autoComplete={false}
        labelCol={10}
        wrapperCol={12}
        className="login-form"
      >
        <Form.Item label="Mật khẩu hiện tại">
          {getFieldDecorator('currentPassword', {
            rules: [{ required: true, message: 'Bạn chưa nhập mật khẩu hiện tại!' }],
          })(
            <Input.Password
              autoComplete={false}
              ref={currentPassword}
            />
          )}
        </Form.Item>
        <Form.Item label="Mật khẩu mới">
          {getFieldDecorator('newPassword', {
            rules: [{ required: true, message: 'Bạn chưa nhập mật khẩu mới!' }],
          })(
            <Input.Password
              autoComplete={false}
              ref={newPassword}
            />
          )}
        </Form.Item>
        <Form.Item label="Xác nhận mật khẩu mới">
          {getFieldDecorator('confirmPassword', {
            rules: [
              { required: true, message: 'Bạn chưa xác nhận mật khẩu mới!' },
              { validator: checkConfirmPassword }
            ],
          })(
            <Input.Password
              autoComplete={false}
              ref={confirmPassword}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create({ name: 'profile_form' })(ChangePasswordDialog)