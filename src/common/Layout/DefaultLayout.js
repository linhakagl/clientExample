import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import DefaultFooter from "./DefaultFooter/DefaultFooter";
import DefaultLeftNav from "./DefaultLeftNav/DefaultLeftNav";
import DefaultHeader from "./DefaultHeader/DefaultHeader";
import { AppContext } from "../../context"
import { ConfigProvider, Spin } from 'antd';
import vi_VN from 'antd/lib/locale-provider/vi_VN';
import en_US from 'antd/lib/locale-provider/en_US'
import routes from "../../routes";
import { Route, Switch } from "react-router-dom";
import { getPermissionByName } from '../utility'
import AccessDenied from '../CommonComponents/Error/AccessDenied'
import UsersApi from '../../services/UsersApi'
import CategoryApi from '../../services/CategoryApi'
import Notification from "../../services/Notification";
import SiteInfoApi from "../../services/SiteInfoApi";
import { fbChat } from "../Constant";
import messenger from '../../assets/messenger.png'
import Messenger from "../CommonComponents/Messenger";


const { Header, Content, Footer, Sider } = Layout;

function DefaultLayout(props) {
  const [collapsed, setCollapsed] = useState(true);
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  const [user, setUser] = useState(undefined);
  const [language, setLanguage] = useState(en_US);
  const [category, setCategory] = useState([]);
  const [siteInfo, setSiteInfo] = useState({});

  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }

  function updateDimensions() {
    if (window.innerWidth < 800) {
      setCollapsed(true)
    }
    setCollapsedWidth(window.innerWidth < 600 ? 0 : 80)
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [])

  useEffect(() => {
    getUserInfo();
    setLanguage(getLanguage());
    getSiteInfo();
  }, [])

  //#region language
  function getLanguage() {
    var lng = localStorage.getItem('language')
    return getLanguageFromString(lng)
  }

  function changeLanguage(lang) {
    setLanguage(getLanguageFromString(lang));
    localStorage.setItem('language', lang);
  }

  function getLanguageFromString(lang) {
    if (lang) {
      if (lang === 'vi_VN') return vi_VN;
      return en_US;
    }
    else {
      localStorage.setItem('language', 'en_US');
      return en_US;
    }
  }
  //#endregion language

  async function getUserInfo() {
    var res = await UsersApi.getCurrentUserInfo("mfb.vn");
    if (res && res.status === 200) {
      await getAllCategrory(res.data.userID);
      setUser(res.data)
    }
  }

  async function getAllCategrory(userId) {
    CategoryApi.getAllCategrory(userId).then(res => {
      if (res) {
        if (res.status === 200 && res.data) {
          console.log('cate', res.data)
          setCategory(res.data);
        }
        else {
          new Notification().error(res.message);
        }
      }
    });
  }

  async function getSiteInfo() {
    var res = await SiteInfoApi.getSiteInfo("mfb.vn");
    if (res) {
      if (res.status === 200 && res.data) {
        setSiteInfo(res.data);
      }
      else {
        new Notification().error(res.message);
      }
    }
  }
  var screenPermistions = undefined;
  if (user !== null && user !== undefined) {
    screenPermistions = user.screenPermistions;
  }
  return (
    <>
      <AppContext.Provider value={{ userInfo: user, language: language, category: category, siteInfo: siteInfo }}>
        <ConfigProvider locale={language}>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              className='left-nav'
              collapsedWidth={collapsedWidth}
            >
              <DefaultLeftNav useSuspense={false} collapsed={collapsed} currentUser={user} />
            </Sider>
            <Layout>
              <Header style={{ background: "#fff", padding: 0 }}>
                <DefaultHeader 
                  changeLanguage={changeLanguage} 
                  useSuspense={false} 
                  toggleCollapsed={toggleCollapsed} 
                  collapsed={collapsed} 
                  user={user} />
              </Header>
              <Content
                style={{
                  minHeight: 280
                }}
              >
                {user !== undefined && siteInfo.siteId !== undefined ? (
                  <Switch>
                    {routes.map((route, index) => {
                      if (!route.groupName || (route.groupName && getPermissionByName(screenPermistions, route.groupName))) {
                        return (
                          <Route
                            component={route.render}
                            {...route}
                            key={"routes-" + index}
                          />
                        )
                      } else {
                        return (
                          <Route
                            component={AccessDenied}
                            {...route}
                            key={"routes-" + index}
                          />
                        )
                      }
                    })}
                  </Switch>
                ) : <Spin style={{ marginLeft: "24px", marginTop: "20px" }} />}
              </Content>
              <Footer>
                <DefaultFooter useSuspense={false} />
              </Footer>
            </Layout>
          </Layout>
        </ConfigProvider>
      </AppContext.Provider>
      <Messenger/>
    </>
  );
}

export default DefaultLayout;