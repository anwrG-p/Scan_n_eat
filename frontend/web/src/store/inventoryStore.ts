import { create } from 'zustand';
import { apiClient } from '../api/client';
import { useAuthStore } from './authStore';

export interface InventoryItem {
    id?: string;
    userId?: string;
    ingredientId: number;
    name: string; // Not in DB but useful for UI, might need to fetch from Ingredients Service or store locally
    quantity: number;
    unit: string;
    expirationDate?: string;
}

interface InventoryState {
    inventory: InventoryItem[];
    isLoading: boolean;
    error: string | null;
    fetchInventory: () => Promise<void>;
    addToInventory: (item: InventoryItem) => Promise<void>;
    removeFromInventory: (id: string) => Promise<void>;
}

export const useInventoryStore = create<InventoryState>()((set) => ({
    inventory: [],
    isLoading: false,
    error: null,

    fetchInventory: async () => {
        set({ isLoading: true, error: null });
        try {
            const user = useAuthStore.getState().user;
            if (!user) {
                // Should probably redirect or handle unauth
                return;
            }
            
            // We need to pass user ID header manually as per our simple backend design
            const config = {
                headers: {
                    'X-User-Id': user.id // Assuming User object has 'id'
                }
            };

            const { data } = await apiClient.get<InventoryItem[]>('/inventory', config);
            set({ inventory: data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch inventory', isLoading: false });
        }
    },

    addToInventory: async (item: InventoryItem) => {
        set({ isLoading: true, error: null });
        try {
            const user = useAuthStore.getState().user;
            if (!user) return;

            const config = {
                headers: {
                    'X-User-Id': user.id
                }
            };

            const { data } = await apiClient.post<InventoryItem>('/inventory', item, config);
            set(state => ({
                inventory: [...state.inventory, data],
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to add item', isLoading: false });
        }
    },

    removeFromInventory: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
             // We optimise optimistically for UI speed or wait? Let's wait for confirmation to be safe
             // But for delete, we need the header? Actually Controller removeItem params doesn't check header for ID match
             // But robust design should. Backend just deletes by ID.
            await apiClient.delete(`/inventory/${id}`);
            
            set(state => ({
                inventory: state.inventory.filter(item => item.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message || 'Failed to remove item', isLoading: false });
        }
    }
}));
