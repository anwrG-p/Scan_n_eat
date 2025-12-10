import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { apiClient } from '../api/client';
import type { AuthResponse } from "../types";

export const useAuth = () => {
  const { setAuth, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.post<AuthResponse>("/auth/login", {
        username: email, // Backend expects username
        password,
      });
      setAuth(data.user, data.access_token);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (_name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Backend expects 'username'. We'll use 'email' as username for now as it's unique.
      await apiClient.post("/auth/register", { username: email, password });
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, signup, logout, isLoading, error };
};
