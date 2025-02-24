
import { create } from 'zustand';

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
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (plan) => set((state) => ({ 
    items: [...state.items, plan] 
  })),
  removeFromCart: (planId) => set((state) => ({ 
    items: state.items.filter(item => item.id !== planId) 
  })),
  clearCart: () => set({ items: [] }),
}));
