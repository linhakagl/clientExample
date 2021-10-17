import BaseApi from './BaseApi';

const  RoleSiteApi = {


    list : async filter => {
        try {
          let result = await BaseApi.execute_post('/Seeding/RoleSite/list', filter);
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      
      listAll : async () => {
        try {
          let result = await BaseApi.execute_post('/Seeding/RoleSite/ListAll');
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      
      getById : async id => {
        try {
          let result = await BaseApi.execute_get('/Seeding/RoleSite/GetById?id=' + id);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      delete : async id => {
        try {
          let result = await BaseApi.execute_delete('/Seeding/RoleSite/delete?id=' + id);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      add : async item => {
        try {
          let result = await BaseApi.execute_post('/Seeding/RoleSite/save', item);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      update : async item => {
        try {
          let result = await BaseApi.execute_post('/Seeding/RoleSite/save', item);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
}

export default RoleSiteApi
