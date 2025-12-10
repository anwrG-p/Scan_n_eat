import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// In docker, build args will set this. Locally, can fallback to full URL if needed, or just use relative.
// Using relative /api/v1 works for both if dev server proxies, but Nginx is main entry.
// For Docker build: /api/v1 (set by ARG)
// For local npm run dev: http://localhost/api/v1 (needs .env)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/api/v1';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
apiClient.interceptors.request.use((config: any) => {
    const { token } = useAuthStore.getState();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error: any) => {
    return Promise.reject(error);
});

// Response interceptor for errors
apiClient.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);
