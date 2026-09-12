'use client';

import React, { createContext, useContext, useState } from 'react';

export type Category = 
  | 'makanan_utama' 
  | 'minuman' 
  | 'dessert' 
  | 'paket_promo' 
  | 'bahan_mentah' 
  | 'jastip_logistik';

export interface MenuItem {
  id: string;
  name: { id: string; en: string };
  description: { id: string; en: string };
  price: number;
  category: Category;
  imageUrl: string;
  stock: number;
  isAvailable: boolean;
  unit?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  totalAmount: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map((i) => i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItem, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.menuItem.id === itemId) {
          const newQty = i.quantity + delta;
          return newQty > 0 ? { ...i, quantity: newQty } : null;
        }
        return i;
      }).filter(Boolean) as CartItem[]
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, totalAmount, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
