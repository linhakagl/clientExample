import React, { PureComponent } from 'react';
import { Menu, Icon, Col, Row, Dropdown, Button } from 'antd';
// import { Link } from "react-router-dom";
import { AuthContext } from '../../../context';
import { withTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { withRouter } from 'react-router';

class DefaultHeader extends PureComponent {
  static contextType = AuthContext;

  onLogout = () => {
    this.context.onLogout()
  }

  changeLanguage = lng => {
    i18n.changeLanguage(lng);
    if (this.props.changeLanguage) {
      this.props.changeLanguage(lng)
    }
  }

  onProfileSetting = () => { 
    this.props.history.push('/profile')
  }

  render() {
    const t = this.props.t
    const languages = (
      <Menu>
        <Menu.Item>
          <Button type="link" onClick={() => this.changeLanguage('vi_VN')}><span style={{ color: "#888" }}>{t('toolbar_006')}</span></Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={() => this.changeLanguage('en_US')}><span style={{ color: "#888" }}>{t('toolbar_007')}</span></Button>
        </Menu.Item>
      </Menu>
    )
    const userInfo = (
      <Menu>
        <Menu.Item>
          <Button type="link" onClick={this.onProfileSetting}>
            <Icon className="default-header-icon" type="setting" />
            <span style={{ color: "#888" }}>Tài khoản</span>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={this.onLogout} style={{ padding: '10px' }} className="logout-button">
            <Icon className="default-header-icon" type="logout" />
            <span style={{ color: "#888" }}>Đăng xuất</span>
          </Button>
        </Menu.Item>
      </Menu>
    )
    var userName = this.props.user ? this.props.user.fullName : "";
    return (
      <>
        <Row style={{ backgroundColor: "#F3F3F4" }}>
          <Col span={2} xs={1}>
            <Icon
              className="trigger"
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.toggleCollapsed}
              style={{ color: "#FFF" }}
            />
          </Col>
          <Col style={{ float: 'right' }}>

            <span className="default-header-text">
              Xin chào, {userName}
            </span>

            {/* <Link to={"/"} style={{ padding: '10px' }} title='Home'><Icon className="default-header-icon" type="home" /></Link> */}

            {/* <Button type="link" style={{ padding: '10px' }} title={t('toolbar_001')}><Icon className="default-header-icon" type="question-circle" /></Button>

            <Dropdown overlay={languages}>
              <Button type="link" style={{ padding: '10px' }}><Icon className="default-header-icon" type="global" /></Button>
            </Dropdown> */}

            <Dropdown overlay={userInfo}>
              <Button type="link" style={{ padding: '10px' }}>
                <Icon className="default-header-icon" type="user" />
              </Button>
            </Dropdown>
          </Col>
        </Row>

      </>
    )
  }
}

export default withRouter(withTranslation()(DefaultHeader))