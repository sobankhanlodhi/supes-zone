'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        // Product already in cart, don't add again (limit to 1 per product)
        return state;
      }
      
      const newItem: CartItem = {
        product: action.payload,
        quantity: 1
      };
      
      const newItems = [...state.items, newItem];
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return {
        items: newItems,
        total: newTotal
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return {
        items: newItems,
        total: newTotal
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  });

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};