import BaseApi from './BaseApi';


const SiteInfoApi = {

  list: async filter => {
    try {
      let result = await BaseApi.execute_post('/Seeding/SiteInfo/list', filter);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  listAll: async () => {
    try {
      let result = await BaseApi.execute_post('/Seeding/SiteInfo/ListAll');
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  getById: async id => {
    try {
      let result = await BaseApi.execute_get('/Seeding/SiteInfo/GetById?id=' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async id => {
    try {
      let result = await BaseApi.execute_delete('/Seeding/SiteInfo/delete?id=' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  add: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/SiteInfo/save', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  update: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/SiteInfo/save', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getSiteInfo: async domain => {
    try {
      let result = await BaseApi.execute_get('/Seeding/SiteInfo/getSiteInfoByDomain?domain=' + domain);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
}

export default SiteInfoApi
