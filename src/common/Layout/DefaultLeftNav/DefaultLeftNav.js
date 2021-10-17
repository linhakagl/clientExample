import React, { useState, useContext, useEffect } from "react";
import { Menu, Icon } from "antd";
import logo from "../../../assets/logo.png";
import logoLeftNav from "../../../assets/logoLeftNav.jpg";
import { Link, withRouter } from "react-router-dom";
import { AuthContext, AppContext } from "../../../context";
// import Account from "./Account";
import { withTranslation } from "react-i18next";

const SubMenu = Menu.SubMenu;

export function DefaultLeftNav(props) {
  const [selectedKeys, setSelectedKeys] = useState("/");
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);
  console.log(appContext)
  useEffect(() => {
    if (selectedKeys !== props.location.pathname) {
      setSelectedKeys(props.location.pathname);
    }
  })


  function onClickMenu({ key }) {
    if (props.history) {
      props.history.push(key);
    }
  };

  function onLogout() {
    authContext.onLogout();
  };


  const t = props.t;

  let logoItem = (
    <div className="logo-element">
      <Link to="/">
        {appContext.siteInfo? (
           <img src={appContext.siteInfo.logo} alt="logo" style={{ width: "40px" }} />
        ): (
          <img src={logo} alt="logo" style={{ width: "40px" }} />
        )}
      </Link>
    </div>
  );
  if (!props.collapsed) {
    // logoItem = <Account menu={menu} />;
    logoItem = (
      <div className="logo-element-collapsed">
        <Link to="/">
          <img src={appContext.siteInfo.logo} alt="logo" style={{ width: "40px" }} />
          <span style={{color: 'white'}}> {appContext.siteInfo.siteHeader}</span> 
        </Link>
      </div>
    )
  }
  const category = appContext.category;
  return (
    <>
      <div>{logoItem}</div>
      <Menu
        selectedKeys={[selectedKeys]}
        onClick={onClickMenu}
        mode="inline"
        theme="dark"
      >
        {/* <Menu.Item key="/" className="menu-first-item">
          <Link to="/">
            <Icon type="home" />
            <span className="nav-text">{t("menu_010")}</span>
          </Link>
        </Menu.Item> */}
        {appContext.userInfo ? (
            <SubMenu
              key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>{appContext.userInfo.account}</span>
                  </span>
                }
                >          
              <Menu.Item key="/profile">
                <Link to="/profile">
                  <Icon type="contacts" />
                  <span className="nav-text">Tài khoản</span>
                </Link>
              </Menu.Item>          
              <Menu.Item key="1">
                <Link to="/Admin/SiteInfo">
                  <Icon type="bank" />
                  <span className="nav-text">Tổng quan</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/paymentInfo">
                <Link to="/paymentInfo">
                  <Icon type="dollar" />
                  <span className="nav-text">Thanh toán</span>
                </Link>
              </Menu.Item>
              <Menu.Item onClick={onLogout}>
                {/* <Link to="/Admin/SiteInfo"> */}
                  <Icon type="logout" />
                  <span className="nav-text">Đăng xuất</span>
                {/* </Link> */}
              </Menu.Item>
          </SubMenu>
        ): null}
        {category && category.map((c, index) => (
          <SubMenu
            key={index}
            title={
              <span>
                <Icon type={c.categroryIcon} />
                <span>{c.categroryTypeName}</span>
              </span>
            }
          >
            {c.targetTypes.map(item => (
              <Menu.Item key={"/" + item.targetCode}>
                <Link to={"/" + item.targetCode}>
                  <span className="nav-text">{item.targetName}</span>
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
        {
         appContext.userInfo && appContext.userInfo.isAdmin? (
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="setting" />
                  <span>QUẢN LÝ</span>
                </span>
              }
              >          
              <Menu.Item key="/Admin/Users">
                <Link to="/Admin/Users">
                  <span className="nav-text">Quản lý người dùng</span>
                </Link>
              </Menu.Item>          
              <Menu.Item key="/Admin/SiteInfo">
                <Link to="/Admin/SiteInfo">
                  <span className="nav-text">Cài Đặt Trang</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/Admin/AllRequests">
                <Link to="/Admin/AllRequests">
                  <span className="nav-text">Quản lý đơn hàng</span>
                </Link>
              </Menu.Item>
          </SubMenu>
          ): null
        }
     
        <SubMenu
          key="Support"
          title={
            <span>
              <Icon type="setting" />
              <span>HỖ TRỢ</span>
            </span>
          }
        >          
          <Menu.Item key="/Admin/Support">
            <a href={appContext.siteInfo.guidePage}>Hướng Dẫn</a>
          </Menu.Item>          
          
        </SubMenu>
      </Menu>
    </>
  );

}

export default withTranslation()(withRouter(DefaultLeftNav));