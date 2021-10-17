import React, { useState, useRef, useContext, useEffect } from 'react'
import { Input, InputNumber, Form, Col, Row, Button, Spin, Modal } from 'antd';
import PageName from '../../common/CommonComponents/PageName';
import { AppContext } from '../../context';
import UsersApi from '../../services/UsersApi';
import { Notification } from '../../services/Notification'
import { useLoading } from '../../common/Hooks/useLoading';
import { validateEmail, isStringNullOrEmpty } from '../../common/utility';
import ChangePasswordDialog from './ChangePasswordDialog';

export default function Profile() {
  const [profileData, setProfileData] = useState({
    userID: '',
    account: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    fuid: '',
    imageLink: null,
    coin: 0
  })
  const [emailValidate, setEmailValidate] = useState({
    help: '',
    validateStatus: ''
  });
  const [showChangePassDialog, setShowChangePassDialog] = useState(false);
  const [loading, showLoading, hideLoading] = useLoading();
  const appContext = useContext(AppContext)

  useEffect(() => {
    loadProfile();
  }, [])

  async function loadProfile() {
    showLoading();
    var res = await UsersApi.getCurrentUserInfo("mfb.vn");
    hideLoading();
    if (res && res.status === 200) {
      setProfileData(res.data)
    }
  }

  function onChangeFormItem(value, field) {
    var newData = { ...profileData };
    newData[field] = value;
    setProfileData(newData);
  }

  async function onSave() {
    var res = await UsersApi.update(profileData);
    if (res) {
      if (res.status === 200) {
        new Notification().success('Thành công');
        loadProfile();
      }
      else {
        new Notification().error(res.message);
      }
    }
    else {
      new Notification().error('Api Connection Error');
    }
  }

  function onRecharge() {
    //TODO: recharge coin
  }

  async function checkEmail() {
    if (isStringNullOrEmpty(profileData.email)) {
      setEmailValidate({
        help: 'Bạn phải nhập email',
        validateStatus: 'error'
      })
      return false;
    }
    if (!validateEmail(profileData.email)) {
      setEmailValidate({
        help: 'Email không hợp lệ',
        validateStatus: 'error'
      })
      return false;
    }
    return await checkEmailExist();
  }


  async function checkEmailExist() {
    var res = await UsersApi.checkEmailExist(profileData.email);
    if (res) {
      if (res.status === 200) {
        if (res.data > 0) {
          setEmailValidate({
            help: 'Email đã có người sử dụng',
            validateStatus: 'error'
          })
          return false;
        }
        else {
          setEmailValidate({});
          return true;
        }
      }
      else {
        new Notification().error(res.message);
      }
    }
    else {
      new Notification().error('Api Connection Error');
    }
  }

  async function changePassword(values) {
    var submitData = {
      ...values,
      domain: 'mfb.vn'
    }
    var res = await UsersApi.changePassword(submitData);
    if (res) {
      if (res.status === 200) {
        if (res.data) {
          new Notification().success('Mật khẩu đã được cập nhật');
        }
        else {
          new Notification().error('Mật khẩu hiện tại không chính xác');
        }
      }
      else {
        new Notification().error(res.message);
      }
    }
    else {
      new Notification().error('Api Connection Error');
    }
  }



  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <>
      <PageName text='Thông tin tài khoản' />
      <Spin spinning={loading}>
        <div className="page-content">
          <Row gutter={24} style={{ marginBottom: 24 }}>
            <Col lg={14}>
              <Form autoComplete={false} {...formItemLayout} className="login-form">
                <Form.Item label="Tên tài khoản">
                  <Input readOnly disabled value={profileData.account} />
                </Form.Item>
                <Form.Item label="Facebook ID">
                  <Input
                    value={profileData.fuid}
                    onChange={e => onChangeFormItem(e.target.value, 'fuid')}
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  {...emailValidate}
                >
                  <Input
                    onBlur={checkEmail}
                    value={profileData.email}
                    onChange={e => onChangeFormItem(e.target.value, 'email')}
                  />
                </Form.Item>
                <Form.Item label="Coin">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <InputNumber
                      value={profileData.coin}
                      style={{ marginRight: 24 }}
                      onChange={value => onChangeFormItem(value, 'coin')}
                    />
                    <Button type="primary" shape="round" onClick={onRecharge}>Recharge</Button>
                  </div>
                </Form.Item>

                <Form.Item label="Họ và tên">
                  <Input
                    value={profileData.fullName}
                    onChange={e => onChangeFormItem(e.target.value, 'fullName')}
                  />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                  <Input
                    value={profileData.phoneNumber}
                    onChange={e => onChangeFormItem(e.target.value, 'phoneNumber')}
                  />
                </Form.Item>
              </Form>
            </Col>

            <Col lg={10}>
              <img src="" style={{ border: '1px solid black' }} width alt="ImageProfile" />
            </Col>
          </Row>
          <Row>
            <div style={{ float: 'right' }}>
              <Button type="default" style={{ marginRight: 10 }} onClick={() => setShowChangePassDialog(true)}>Đổi mật khẩu</Button>
              <Button type="danger" onClick={onSave}>Lưu thông tin</Button>
            </div>
          </Row>
        </div>
      </Spin>
      {showChangePassDialog ?
        <ChangePasswordDialog
          onCancel={() => setShowChangePassDialog(false)}
          onOk={changePassword}
        />
        : null}
    </>
  )
}
