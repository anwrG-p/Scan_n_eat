import { create } from 'zustand';
import { apiClient } from '../api/client';


interface AdminStats {
    totalUsers: number;
    totalRecipes: number;
    ordersToday: number;
    systemStatus: string;
}

interface User {
    userId: string;
    username: string;
    role: string;
    createdAt: string;
}

interface AdminState {
    stats: AdminStats | null;
    users: User[];
    logs: any[];
    isLoading: boolean;
    error: string | null;
    
    fetchStats: () => Promise<void>;
    fetchUsers: () => Promise<void>;
    fetchLogs: () => Promise<void>;
    addUser: (user: any) => Promise<void>;
    addRecipe: (recipe: any) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
    updateUserRole: (userId: string, newRole: string) => Promise<void>;
}

// API_BASE is handled by client


export const useAdminStore = create<AdminState>((set, get) => ({
    stats: null,
    users: [],
    logs: [],
    isLoading: false,
    error: null,

    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await apiClient.get(`/admin/stats`);
            set({ stats: data, isLoading: false });
        } catch (error: any) {
            console.error('Failed to fetch stats:', error);
            set({ error: error.message || 'Failed to fetch stats', isLoading: false });
        }
    },

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            console.log('Fetching users from:', `/admin/users`);
            const { data } = await apiClient.get(`/admin/users`);
            console.log('Users received:', data);
            set({ users: data, isLoading: false });
        } catch (error: any) {
            console.error('Failed to fetch users:', error);
            console.error('Error details:', error.response?.data || error.message);
            set({ error: error.message || 'Failed to fetch users', isLoading: false });
        }
    },

    fetchLogs: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await apiClient.get(`/admin/logs`);
            set({ logs: data, isLoading: false });
        } catch (error: any) {
            console.error('Failed to fetch logs:', error);
            set({ error: error.message || 'Failed to fetch logs', isLoading: false });
        }
    },

    addUser: async (user: any) => {
        try {
            await apiClient.post(`/admin/users`, user);
            await get().fetchUsers();
        } catch (error: any) {
            console.error('Failed to add user:', error);
            throw error;
        }
    },

    addRecipe: async (recipe: any) => {
        try {
            await apiClient.post(`/recipes`, recipe);
            // We might want to fetch recipes here if we had a fetchRecipes action in this store
            // But recipes are usually in recipeStore. adminStore might need to fetch them too for management
        } catch (error: any) {
            console.error('Failed to add recipe:', error);
            throw error;
        }
    },

    deleteUser: async (userId: string) => {
        try {
            await apiClient.delete(`/admin/users/${userId}`);
            // Refresh users list
            await get().fetchUsers();
        } catch (error: any) {
            console.error('Failed to delete user:', error);
            throw error;
        }
    },

    updateUserRole: async (userId: string, newRole: string) => {
        try {
            await apiClient.put(`/admin/users/${userId}`, { role: newRole });
            // Refresh users list
            await get().fetchUsers();
        } catch (error: any) {
            console.error('Failed to update user role:', error);
            throw error;
        }
    },
}));
