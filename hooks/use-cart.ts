import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 1. Define what a Cart Item looks like
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

// 2. Create the Store (with persistence so it survives refresh)
export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        
        if (existingItem) {
          return console.log("Item already in cart");
        }
        
        set({ items: [...get().items, data] });
        // In a real app, we would add a "Toast" notification here
        console.log("Item added to cart!"); 
      },

      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // The key in LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);