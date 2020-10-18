import BaseApi from './BaseApi';

const UsersApi = {
  list: async filter => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Users/list', filter);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  listAll: async () => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Users/ListAll');
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  getById: async id => {
    try {
      let result = await BaseApi.execute_get('/Seeding/Users/GetById?id=' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async id => {
    try {
      let result = await BaseApi.execute_delete('/Seeding/Users/delete?id=' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  add: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Users/save', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  update: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Users/UpdateUser', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  updateUserRole: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Users/UpdateUserRole', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  register: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Users/register', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getCurrentUserInfo: async (domain) => {
    try {
      let result = await BaseApi.execute_get('/Seeding/Users/GetCurrentUserInfo?domain=' + domain);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  getUserSelect: async (pattern, siteId) => {
    try {
      let result = await BaseApi.execute_get(`/Seeding/Users/getUserSelect?siteId=${siteId}&&pattern=${pattern}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  AdminAddCoin: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Users/AdminAddCoin', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  checkEmailExist: async item => {
    try {
      let result = await BaseApi.execute_get('/Seeding/Users/checkEmailExist?email=' + item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  changePassword: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Users/changePassword', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UsersApi
