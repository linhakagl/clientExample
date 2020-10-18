import BaseApi from './BaseApi';

const  ConfigurationApi = {


    list : async filter => {
        try {
          let result = await BaseApi.execute_post('/Seeding/Configuration/list', filter);
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      
      listAll : async () => {
        try {
          let result = await BaseApi.execute_post('/Seeding/Configuration/ListAll');
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      
      getById : async id => {
        try {
          let result = await BaseApi.execute_get('/Seeding/Configuration/GetById?id=' + id);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      delete : async id => {
        try {
          let result = await BaseApi.execute_delete('/Seeding/Configuration/delete?id=' + id);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      add : async item => {
        try {
          let result = await BaseApi.execute_post('/Seeding/Configuration/save', item);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      update : async item => {
        try {
          let result = await BaseApi.execute_post('/Seeding/Configuration/save', item);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
}

export default ConfigurationApi
