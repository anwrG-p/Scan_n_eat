import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Default to 10.0.2.2 for Android Emulator calling Host localhost
// For iOS Simulator, use http://localhost:8000
// Ideally, use an environment variable or Expo Constants
const API_URL = 'http://10.0.2.2:8000';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);
