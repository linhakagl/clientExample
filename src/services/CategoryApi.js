import BaseApi from './BaseApi';

const CategoryApi = {
  list: async filter => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Category/list', filter);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  listAll: async () => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Category/ListAll');
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  getById: async id => {
    try {
      let result = await BaseApi.execute_get('/Seeding/Category/GetById?id=' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  GetListConfigPriceByTargetId: async (SiteId, TargetId , roleId )=> {
    try {
      let result = await BaseApi.execute_get(`/Seeding/Category/GetListConfigPriceByTargetId?SiteId=${SiteId}&&TargetId=${TargetId}&&RoleId=${roleId}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async id => {
    try {
      let result = await BaseApi.execute_delete('/Seeding/Category/delete?id=' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  add: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Category/save', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  UpdateConfigPrice: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Category/UpdateConfigPrice', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  update: async item => {
    try {
      let result = await BaseApi.execute_post('/Seeding/Category/save', item);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getAllCategrory: async id => {
    try {
      let result = await BaseApi.execute_get('/Seeding/Category/GetAllConfigPriceByUser?UserId=' + id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getAllCategroryType: async () => {
    try {
      let result = await BaseApi.execute_get('/Seeding/CategoryType/ListAll');
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CategoryApi
