import React from 'react'

const AuthContext = React.createContext({
  isAuth: false,
  onLogin: null,
  onLogout: null
});

const AppContext = React.createContext({
  userInfo: null,
  language: null,
  category: null,
  siteInfo: null
})
export { AuthContext, AppContext };