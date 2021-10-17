import axios from 'axios'
const queryString = require('query-string');

const baseURL = process.env.REACT_APP_API_URL;
const baseAutURL = process.env.REACT_APP_AUTH_URL;

const  instance = axios.create();
instance.interceptors.response.use(response => {
    return response.data;
},error => {
    if(error.response && error.response.status === 401){
        localStorage.removeItem("tss-current-user");
        window.location.reload();
    }
    return Promise.reject(error)
})

instance.interceptors.request.use(request => {
    let currentUser = null
    if(localStorage.getItem('tss-current-user')){
      currentUser = JSON.parse(localStorage.getItem('tss-current-user'));
    }
    if (currentUser && currentUser.token) {
        request.headers['Authorization'] = `Bearer ${ currentUser.token }`;

    } 
     return request;
    },error => {
    console.error(error);
    return Promise.reject(error)
})


export class AuthenApi {
    login = async (model) => {
        return await instance.post(baseAutURL , queryString.stringify({
            username: model.username,
            password: model.password,
            client_id: 'ro.client',
            client_secret: 'secret',
            grant_type: "password",
            scope: "seeding_api",
            domain: 'mfb.vn'
        }), {
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
        }
        })
    }
   
    getUserDepartmentInfo = async model => {
        return instance.get(baseURL + '/api/vn/UserSyncAd/getUserDepartmentByAccount?account=' + model)
    }
}

export default AuthenApi
