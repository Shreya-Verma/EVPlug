import axios from 'axios';
import CONFIG from "../../env.config";


const auth = axios.create({
    baseURL: CONFIG.DEV_APP_API
});

auth.interceptors.response.use(
    res => res,
    err => {
        console.log(err.response.data);
        return Promise.reject(err.response.data);
    }
)
  
export default auth;