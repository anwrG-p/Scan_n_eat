import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Dish } from '../types';

interface CartState {
    items: CartItem[];
    addItem: (dish: Dish) => void;
    removeItem: (dishId: string) => void;
    updateQuantity: (dishId: string, quantity: number) => void;
    clearCart: () => void;
    formattedTotal: () => string;
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
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
