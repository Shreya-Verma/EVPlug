import axios from 'axios';
import CONFIG from "../../env.config";


const auth = axios.create({
    baseURL: CONFIG.PROD_APP_API
});

auth.interceptors.response.use(
    res => res,
    err => {
        return Promise.reject(err.response.data);
    }
)
  
export default auth;