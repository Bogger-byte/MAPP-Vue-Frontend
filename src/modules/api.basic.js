import axios from "axios";


// Fast-API backend
const apiBasic = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 30000
});

export default apiBasic;
