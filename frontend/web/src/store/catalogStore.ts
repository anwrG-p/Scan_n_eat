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
    dishes: [
        {
            id: '1',
            name: 'Mediterranean Salad',
            description: 'Fresh and healthy salad with feta cheese and olives. A perfect choice for a light lunch or side dish.',
            price: 12.99,
            image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400',
            ingredients: ['Feta Cheese', 'Olives', 'Cucumber', 'Tomatoes', 'Olive Oil', 'Oregano'],
            category: 'Salad'
        },
        {
            id: '2',
            name: 'Grilled Salmon',
            description: 'Perfectly grilled salmon with asparagus and lemon butter sauce. High in protein and omega-3s.',
            price: 18.50,
            image_url: 'https://www.thecookierookie.com/wp-content/uploads/2023/05/grilled-salmon-recipe-2.jpg',
            ingredients: ['Salmon Fillet', 'Asparagus', 'Lemon', 'Butter', 'Garlic', 'Dill'],
            category: 'Seafood'
        },
        {
            id: '3',
            name: 'Vegetable Stir-Fry',
            description: 'Quick and easy stir-fry with seasonal vegetables and savory soy glaze.',
            price: 10.99,
            image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
            ingredients: ['Broccoli', 'Carrots', 'Bell Peppers', 'Soy Sauce', 'Ginger', 'Sesame Oil'],
            category: 'Vegetarian'
        }
    ],
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
