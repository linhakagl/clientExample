import  axios from 'axios';


const  instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use(request => {
    let currentUser = null 
    if(localStorage.getItem(process.env.REACT_APP_Token_Name)){
      currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_Token_Name));
    }
    if (currentUser && currentUser.access_token) {
        request.headers['Authorization'] = `Bearer ${ currentUser.access_token }`;
    } 
     return request;
    },error => {
    console.error(error);
    return Promise.reject(error)
})
  
instance.interceptors.response.use(response => {
    return response.data;
},error => {
    if(error.response && error.response.status === 401){
        localStorage.removeItem(process.env.REACT_APP_Token_Name);
        window.location.reload();
    }
    return Promise.reject(error)
})

export default instance;
