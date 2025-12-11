import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Dish } from '../types';
import { apiClient } from '../api/client';
import { useAuthStore } from './authStore';

interface CartState {
    items: CartItem[];
    addItem: (dish: Dish) => void;
    removeItem: (dishId: string) => void;
    updateQuantity: (dishId: string, quantity: number) => void;
    clearCart: () => void;
    getItemsCount: () => number;
    formattedTotal: () => string;
    checkout: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (dish) =>
                set((state) => {
                    const existing = state.items.find((i) => i.id === dish.id);
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === dish.id ? { ...i, cartQuantity: i.cartQuantity + 1 } : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...dish, cartQuantity: 1 }] };
                }),
            removeItem: (dishId) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== dishId),
                })),
            updateQuantity: (dishId, quantity) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === dishId ? { ...i, cartQuantity: Math.max(0, quantity) } : i
                    ),
                })),
            clearCart: () => set({ items: [] }),
            formattedTotal: () => {
                const total = get().items.reduce(
                    (sum, item) => sum + item.price * item.cartQuantity,
                    0
                );
                return total.toFixed(2);
            },
            getItemsCount: () => {
                return get().items.reduce((count, item) => count + item.cartQuantity, 0);
            },
            checkout: async () => {
                const { user } = useAuthStore.getState();
                if (!user) {
                    throw new Error('User must be logged in to checkout');
                }
                
                const state = get();
                if (state.items.length === 0) {
                     return;
                }

                const orderRequest = {
                    userId: user.id || (user as any).userId,
                    items: state.items.map(item => ({
                        name: item.name || item.title, // handle potential name differences
                        quantity: item.cartQuantity,
                        price: item.price,
                        recipeId: item.id
                        // ingredientId not supported for direct cart items yet
                    }))
                };

                try {
                    await apiClient.post('/orders', orderRequest);
                    get().clearCart();
                } catch (error) {
                    console.error('Checkout failed:', error);
                    throw error;
                }
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
