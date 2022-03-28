import axios from "axios";
import { useUserStore } from "../stores/user.store";


// Fast-API backend
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 30000
});

apiClient.interceptors.request.use(
    config => {
        const userStore = useUserStore();
        config.headers['Authorization'] = `Bearer ${userStore.accessToken}`;
        return config;
    }
);

apiClient.interceptors.response.use(
    response => response,
    error => {
        const userStore = useUserStore();
        const status = error.response ? error.response.status : null;
        if (status === 401) {
            userStore.refresh();
            error.config.headers['Authorization'] = `Bearer ${userStore.accessToken}`;
            error.config.baseURL = undefined;
            return axios.request(error.config);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
