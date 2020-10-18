import axios from './axios'

const  BaseApi = {

  execute_get : async url => {
    return await axios.get(url);
  },

  execute_post : async (url, model) => {
    return await axios.post(url, model);
  },


  execute_put : async (url, model) => {
    return await axios.put(url, model);
  },

  execute_delete : async (url, model) => {
    return await axios.delete(url, model);
  },

  uploadFile : async (url, file) => {
    var data = new FormData();
    data.append("file", file);
    return await axios.post(url, data);   

  },

  execute_download : async (url, model) => {
    return await axios.request({ url, method : "GET",  responseType: 'blob' });
  },

  execute_post_download : async (url, model) => {
    return await axios.request({ url, method : "POST",  responseType: 'blob' , data: model });
  }

}

export default BaseApi
