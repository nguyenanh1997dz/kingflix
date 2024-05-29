import axios from 'axios';

const BASE_URL_BACKEND = "http://localhost:8000/api/";

const Axios = axios.create({
    baseURL: BASE_URL_BACKEND,
    withCredentials: true,
});

Axios.interceptors.request.use(
    config => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo && userInfo.token) {
                config.headers.Authorization = `Bearer ${userInfo.token}`; 
            }
        } catch (error) {
            console.error("Error parsing userInfo from localStorage:", error);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default Axios;
