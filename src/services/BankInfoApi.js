import BaseApi from './BaseApi';

const  BankInfoApi = {


    list : async filter => {
        try {
          let result = await BaseApi.execute_post('/Seeding/BankInfo/list', filter);
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      
      listAll : async () => {
        try {
          let result = await BaseApi.execute_post('/Seeding/BankInfo/ListAll');
          return result;
        } catch (error) {
          console.error(error);
        }
      },
      
      getById : async id => {
        try {
          let result = await BaseApi.execute_get('/Seeding/BankInfo/GetById?id=' + id);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      delete : async id => {
        try {
          let result = await BaseApi.execute_delete('/Seeding/BankInfo/delete?id=' + id);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      add : async item => {
        try {
          let result = await BaseApi.execute_post('/Seeding/BankInfo/save', item);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
    
      update : async item => {
        try {
          let result = await BaseApi.execute_post('/Seeding/BankInfo/save', item);
          return result;
        } catch (error) {
          console.log(error);
        }
      },
}

export default BankInfoApi
