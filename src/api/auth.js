import axios from 'axios';
import CONFIG from "../../env.config";
export default axios.create({
    baseURL: CONFIG.DEV_APP_API
});
