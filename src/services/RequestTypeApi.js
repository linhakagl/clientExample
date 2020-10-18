import BaseApi from './BaseApi';

const  RequestTypeApi = {


    list : async filter => {
        try {
          let result = await BaseApi.execute_post('/Seeding/RequestType/list', filter);
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      
      listAll : async () => {
        try {
          let result = await BaseApi.execute_post('/Seeding/RequestType/ListAll');
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      
      getById : async id => {
        try {
          let result = await BaseApi.execute_get('/Seeding/RequestType/GetById?id=' + id);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      delete : async id => {
        try {
          let result = await BaseApi.execute_delete('/Seeding/RequestType/delete?id=' + id);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      add : async item => {
        try {
          let result = await BaseApi.execute_post('/Seeding/RequestType/save', item);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      update : async item => {
        try {
          let result = await BaseApi.execute_post('/Seeding/RequestType/save', item);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
}

export default RequestTypeApi
