import BaseApi from './BaseApi';

const RequestsApi = {
  list: async filter => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Requests/list', filter);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  listAll: async () => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Requests/ListAll');
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  getById: async id => {
    try {
      let result = await BaseApi.execute_get('/Seeding/Requests/GetById?id=' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async id => {
    try {
      let result = await BaseApi.execute_delete('/Seeding/Requests/delete?id=' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  add: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Requests/save', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  update: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Requests/save', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  createRequest: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Requests/createRequest', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getAllRequestsAdmin: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Requests/getAllRequestsAdmin', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getMyRequest: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Requests/getMyRequest', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default RequestsApi
