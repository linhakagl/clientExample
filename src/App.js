import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/app.css';
import Layout from './common/Layout/Layout';
import Login from './common/Login/LoginNew';
import { AuthContext } from './context';
import { Register } from './common/Login/Register';
import { ForgotPassword } from './common/Login/ForgotPassword';

let LoginComponet = Login;

function App() {
  let token = getToken();
  const [isAuth, setAuth] = useState(token !== null);



  function onLogin() {
    setAuth(true);
  }

  function onLogout() {
    localStorage.removeItem(process.env.REACT_APP_Token_Name);
    setAuth(false);
  }

  function getToken() {
    let access_token = null;
    const currentUser = localStorage.getItem(process.env.REACT_APP_Token_Name);
    if (currentUser) {
      let user = JSON.parse(currentUser);
      if (user.access_token) {
        access_token = user.access_token;
      }
    }
    return access_token;
  }
  function getContent(isAuth) {
    const pathname = window.location.pathname;
    if (isAuth) {
      return <Layout />;
    }
    else if (pathname == '/Register') {
      return <Register />
    }
    else if (pathname == '/ForgotPassword') {
      return <ForgotPassword />
    }
    return <LoginComponet />
  }

  return (
    <>
      <Router basename={process.env.REACT_APP_SUB_APP}>
        <AuthContext.Provider value={{ isAuth, onLogin, onLogout }}>
          {getContent(isAuth)}
        </AuthContext.Provider>
      </Router>
    </>

  )
}

export default App
