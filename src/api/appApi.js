import axios from 'axios';
import CONFIG from "../../env.config";
import EncryptedStorage from 'react-native-encrypted-storage';

const appApi = axios.create({
    baseURL: CONFIG.DEV_APP_API
});
  
appApi.interceptors.request.use(
async (config) => {
    const authData = await EncryptedStorage.getItem("authData");
    console.log(authData)
    const {token} = JSON.parse(authData);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(err) => {
    return Promise.reject(err);
}
);

appApi.interceptors.response.use(
    res => res,
    err => {
        console.log(err.response.data);
        return Promise.reject(err.response.data);
    }
)
  
export default appApi;