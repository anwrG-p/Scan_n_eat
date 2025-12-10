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
        email,
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

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Note: Endpoint /auth/register matches AuthController
      await apiClient.post("/auth/register", { name, email, password });
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
