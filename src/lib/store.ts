
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  items: Plan[];
  addToCart: (plan: Plan) => void;
  removeFromCart: (planId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (plan) => set((state) => ({ 
        items: [...state.items, {
          ...plan,
          price: typeof plan.price === 'string' ? parseFloat(plan.price) : plan.price,
        }] 
      })),
      removeFromCart: (planId) => set((state) => ({ 
        items: state.items.filter(item => item.id !== planId) 
      })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const itemPrice = typeof item.price === 'string' 
            ? parseFloat(item.price) 
            : item.price;
          return total + (isNaN(itemPrice) ? 0 : itemPrice);
        }, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
