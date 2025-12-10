import { create } from 'zustand';
import type { Ingredient } from '../types';
import { apiClient } from '../api/client';

interface IngredientsState {
    scannedIngredients: Ingredient[];
    isLoading: boolean;
    error: string | null;
    fetchIngredients: () => Promise<void>;
    addIngredient: (ingredient: Ingredient) => Promise<void>;
    removeIngredient: (id: string, index: number) => Promise<void>; // Updated signature
    clearIngredients: () => void;
}

export const useIngredientsStore = create<IngredientsState>((set, _get) => ({
    scannedIngredients: [],
    isLoading: false,
    error: null,

    fetchIngredients: async () => {
        set({ isLoading: true, error: null });
        try {
            // Mapping /api/v1/ingredients -> handled by Gateway to /api/ingredients
            const { data } = await apiClient.get<Ingredient[]>('/ingredients');
            set({ scannedIngredients: data });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch' });
        } finally {
            set({ isLoading: false });
        }
    },

    addIngredient: async (ingredient: Ingredient) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await apiClient.post<Ingredient>('/ingredients', ingredient);
            set((state: IngredientsState) => ({
                scannedIngredients: [...state.scannedIngredients, data],
            }));
        } catch (err: any) {
            set({ error: err.message || 'Failed to add' });
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },

    removeIngredient: async (_id: string, index: number) => {
        // Optimistically remove
        set((state: IngredientsState) => ({
            scannedIngredients: state.scannedIngredients.filter((_: Ingredient, i: number) => i !== index),
        }));
        // TODO: Implement DELETE endpoint if available, otherwise just local for now if ID missing
        // if (_id) await apiClient.delete(`/ingredients/${_id}`);
    },

    clearIngredients: () => set({ scannedIngredients: [] }),
}));
