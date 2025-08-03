import axios from 'axios';
import { ACCESS_TOKEN } from '../utilities/constants';

const VITE_API_URL = import.meta.env.VITE_API_URL;

const httpClient = axios.create({
    baseURL: VITE_API_URL,      
});

// Add interceptor 
httpClient.interceptors.request.use(
    config =>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization = `Bearer ${token}`;          
        }

        // Add ngrok header to skip browser warning
        config.headers['ngrok-skip-browser-warning'] = 'true';

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export default httpClient;

