import axios from 'axios';
import { getCurrentToken } from './authService';

const api = axios.create({
    baseURL: 'http://localhost:8081/api',
});

api.interceptors.request.use(
    (config) => {
        const token = getCurrentToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
