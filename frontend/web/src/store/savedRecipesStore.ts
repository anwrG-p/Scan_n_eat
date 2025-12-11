import { create } from 'zustand';
import type { Dish } from '../types';
import { apiClient } from '../api/client';

interface SavedRecipesState {
    savedRecipes: Dish[];
    trendingRecipes: Dish[];
    isLoading: boolean;
    error: string | null;
    fetchSavedRecipes: () => Promise<void>;
    fetchTrendingRecipes: (limit?: number) => Promise<void>;
    toggleSaveRecipe: (recipeId: string) => Promise<boolean>;
    isRecipeSaved: (recipeId: string) => Promise<boolean>;
}

export const useSavedRecipesStore = create<SavedRecipesState>((set, get) => ({
    savedRecipes: [],
    trendingRecipes: [],
    isLoading: false,
    error: null,

    fetchSavedRecipes: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await apiClient.get<any>('/recipes/saved', {
                headers: { 'X-User-Id': '1' } // TODO: Get from auth store
            });
            
            const recipeList = Array.isArray(data) ? data : [];
            
            const mappedDishes: Dish[] = recipeList.map((recipe: any) => ({
                id: recipe.id,
                name: recipe.title,
                description: recipe.instructions || 'No description available',
                price: recipe.price || 0,
                image_url: recipe.imageUrl || 'https://via.placeholder.com/400',
                ingredients: [],
                category: 'Main Course'
            }));

            set({ savedRecipes: mappedDishes, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch saved recipes', isLoading: false });
        }
    },

    fetchTrendingRecipes: async (limit = 10) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await apiClient.get<any>(`/recipes/trending?limit=${limit}`);
            
            const recipeList = Array.isArray(data) ? data : [];
            
            const mappedDishes: Dish[] = recipeList.map((recipe: any) => ({
                id: recipe.id,
                name: recipe.title,
                description: recipe.instructions?.substring(0, 100) + '...' || 'No description available',
                price: recipe.price || 0,
                image_url: recipe.imageUrl || 'https://via.placeholder.com/400',
                ingredients: [],
                category: 'Main Course'
            }));

            set({ trendingRecipes: mappedDishes, isLoading: false });
        } catch (error: any) {
            console.error('Trending error:', error);
            set({ error: error.message || 'Failed to fetch trending recipes', isLoading: false });
        }
    },

    toggleSaveRecipe: async (recipeId: string) => {
        try {
            const { data } = await apiClient.post<any>(`/recipes/${recipeId}/save`, {}, {
                headers: { 'X-User-Id': '1' } // TODO: Get from auth store
            });
            
            // Refresh saved recipes list
            await get().fetchSavedRecipes();
            
            return data.saved;
        } catch (error: any) {
            console.error('Toggle save error:', error);
            throw error;
        }
    },

    isRecipeSaved: async (recipeId: string) => {
        try {
            const { data } = await apiClient.get<boolean>(`/recipes/${recipeId}/is-saved`, {
                headers: { 'X-User-Id': '1' } // TODO: Get from auth store
            });
            return data;
        } catch (error: any) {
            console.error('Is saved check error:', error);
            return false;
        }
    },
}));
