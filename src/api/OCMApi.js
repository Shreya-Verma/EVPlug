import axios from 'axios';
import CONFIG from "../../env.config";

export default axios.create({
    baseURL: CONFIG.OCM_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CONFIG.OCM_API_KEY
    }
});
