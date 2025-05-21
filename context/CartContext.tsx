'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types for cart items and context
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
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

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextProps {
  cart: CartState;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Initial state for the cart
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer function to handle cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);

      if (existingItemIndex >= 0) {
        // If item already exists, increase its quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        };
      } else {
        // Add new item to cart
        return {
          ...state,
          items: [...state.items, { product, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.product.id === Number(productId));
      
      if (!existingItem) return state;

      const updatedItems = state.items.filter(item => item.product.id !== Number(productId));
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - existingItem.quantity,
        totalPrice: state.totalPrice - (existingItem.product.price * existingItem.quantity),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }

      const existingItemIndex = state.items.findIndex(item => item.product.id === Number(id));
      
      if (existingItemIndex === -1) return state;
      
      const existingItem = state.items[existingItemIndex];
      const quantityDifference = quantity - existingItem.quantity;
      
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity,
      };
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDifference,
        totalPrice: state.totalPrice + (existingItem.product.price * quantityDifference),
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

// Create the CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

