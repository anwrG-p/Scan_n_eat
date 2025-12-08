import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
// import { apiClient } from '../api/client';
import type { AuthResponse } from '../types';

export const useAuth = () => {
    const { setAuth, logout } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, _password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // FIXME: Replace with actual endpoint
            // const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });

            // Mocking response for now to allow progress without backend
            const data: AuthResponse = {
                user: { id: '1', name: 'Test User', email, role: 'user' },
                access_token: 'mock-jwt-token',
            };

            // Simulate network delay
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

    const signup = async (_name: string, _email: string, _password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // FIXME: Replace with actual endpoint
            // await apiClient.post('/auth/signup', { name, email, password });

            // Mock success
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
