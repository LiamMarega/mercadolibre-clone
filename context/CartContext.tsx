// cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';

// Las interfaces se mantienen igual
export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const defaultCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Custom storage object for Zustand persistence with cookies
const cookieStorage = {
  getItem: (name: string) => Cookies.get(name) || null,
  setItem: (name: string, value: string) => Cookies.set(name, value, { expires: 7 }),
  removeItem: (name: string) => Cookies.remove(name),
};

interface CartStore extends CartState {
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  computeTotals: (items: CartItem[]) => { totalItems: number; totalPrice: number };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...defaultCartState,
      
      computeTotals: (items) => ({
        totalItems: items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: items.reduce((total, item) => total + (item.product.price * item.quantity), 0),
      }),

      addItem: (item: Product) => {
        const { items, computeTotals } = get();
        const existingItemIndex = items.findIndex(
          (cartItem) => cartItem.product.id === item.id
        );

        let newItems;
        if (existingItemIndex > -1) {
          // Item exists, increment quantity
          newItems = [...items];
          newItems[existingItemIndex].quantity += 1;
        } else {
          // New item
          newItems = [...items, { product: item, quantity: 1 }];
        }

        const { totalItems, totalPrice } = computeTotals(newItems);

        set({ items: newItems, totalItems, totalPrice });
      },

      removeItem: (id: number) => {
        const { items, computeTotals } = get();
        const newItems = items.filter((item) => item.product.id !== id);
        const { totalItems, totalPrice } = computeTotals(newItems);

        set({ items: newItems, totalItems, totalPrice });
      },

      clearCart: () => {
        set(defaultCartState);
      },

      updateQuantity: (id: number, quantity: number) => {
        const { items, computeTotals } = get();
        const newItems = items.map(item => 
          item.product.id === id ? { ...item, quantity } : item
        );
        const { totalItems, totalPrice } = computeTotals(newItems);

        set({ items: newItems, totalItems, totalPrice });
      },
    }),
    {
      name: 'mercadolibre_cart', // nombre de la clave en el storage
      storage: createJSONStorage(() => cookieStorage), // usamos nuestro adaptador de cookies
    }
  )
);

// Hook personalizado para usar el store (opcional pero recomendado)
export function useCart() {
  return useCartStore();
}