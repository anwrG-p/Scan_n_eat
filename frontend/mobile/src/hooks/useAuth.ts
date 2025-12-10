import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../api/client';
import { AuthResponse } from '../types';

export const useAuth = () => {
    const { setAuth, logout } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // Mock API call
            // const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });

            const data: AuthResponse = {
                user: { id: '1', name: 'Test User', email, role: 'user' },
                access_token: 'mock-jwt-token',
            };

            await new Promise(resolve => setTimeout(resolve, 1000));

            setAuth(data.user, data.access_token);
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // await apiClient.post('/auth/signup', { name, email, password });
            await new Promise(resolve => setTimeout(resolve, 1000));
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { login, signup, logout, isLoading, error };
};
