import { create } from 'zustand';
import type { Dish } from '../types';
import { apiClient } from '../api/client';

interface CatalogState {
    dishes: Dish[];
    isLoading: boolean;
    error: string | null;
    fetchDishes: () => Promise<void>;
}

export const useCatalogStore = create<CatalogState>((set) => ({
    dishes: [],
    isLoading: false,
    error: null,
    fetchDishes: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.get('/catalog');
            set({ dishes: response.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch catalog', isLoading: false });
        }
    },
}));
