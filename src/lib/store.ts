
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StorageUpgrade {
  additionalGB: number;
  price: number;
}

export interface CartItem extends Plan {
  quantity: number;
  storageUpgrade?: StorageUpgrade;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  specs: {
    ram: string;
    cpu: string;
    storage: string;
  };
  features: string[];
}

interface CartStore {
  items: CartItem[];
  addToCart: (plan: Plan) => void;
  removeFromCart: (planId: string) => void;
  updateQuantity: (planId: string, quantity: number) => void;
  updateStorageUpgrade: (planId: string, additionalGB: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (plan) => set((state) => {
        const existingItem = state.items.find(item => item.id === plan.id);
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === plan.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        return {
          items: [...state.items, {
            ...plan,
            quantity: 1,
            price: typeof plan.price === 'string' ? parseFloat(plan.price) : plan.price,
          }]
        };
      }),
      removeFromCart: (planId) => set((state) => ({ 
        items: state.items.filter(item => item.id !== planId) 
      })),
      updateQuantity: (planId, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === planId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
      })),
      updateStorageUpgrade: (planId, additionalGB) => set((state) => ({
        items: state.items.map(item =>
          item.id === planId
            ? {
                ...item,
                storageUpgrade: additionalGB > 0
                  ? { additionalGB, price: Math.floor(additionalGB / 50) }
                  : undefined
              }
            : item
        )
      })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const basePrice = typeof item.price === 'string' 
            ? parseFloat(item.price) 
            : item.price;
          const storageUpgradePrice = item.storageUpgrade?.price || 0;
          return total + ((basePrice + storageUpgradePrice) * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
