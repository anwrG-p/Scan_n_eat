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
            // Call Recipe Service
            const { data } = await apiClient.get<any>('/recipes');
            
            // Map RecipeDTO to Frontend Dish
            // Ensure data is array; it might be wrapped or empty
            const recipeList = Array.isArray(data) ? data : (data.content || []);

            const mappedDishes: Dish[] = recipeList.map((recipe: any) => ({
                id: recipe.id,
                name: recipe.title,
                description: recipe.instructions || 'No description available',
                price: 12.00, // Hardcoded price as it's not in Recipe Service
                image_url: recipe.imageUrl || 'https://via.placeholder.com/400',
                ingredients: [], // IDs are numbers, names not available without extra calls
                category: 'Main Course'
            }));

            set({ dishes: mappedDishes, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch catalog', isLoading: false });
        }
    },
}));
