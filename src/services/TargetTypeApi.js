import BaseApi from './BaseApi';

const  TargetTypeApi = {


    list : async filter => {
        try {
          let result = await BaseApi.execute_post('/Seeding/TargetType/list', filter);
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      
      listAll : async () => {
        try {
          let result = await BaseApi.execute_get('/Seeding/TargetType/ListAll');
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      
      getById : async id => {
        try {
          let result = await BaseApi.execute_get('/Seeding/TargetType/GetById?id=' + id);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      delete : async id => {
        try {
          let result = await BaseApi.execute_delete('/Seeding/TargetType/delete?id=' + id);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      add : async item => {
        try {
          let result = await BaseApi.execute_post('/Seeding/TargetType/save', item);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      update : async item => {
        try {
          let result = await BaseApi.execute_post('/Seeding/TargetType/save', item);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
}

export default TargetTypeApi
