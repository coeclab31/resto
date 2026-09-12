'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">AR</div>
        <div>
          <h1 className="font-bold text-gray-900 leading-none text-sm">Aneka Rasa Restoran</h1>
          <span className="text-[10px] text-gray-500">Resto & Jastip Korea-Indo</span>
        </div>
      </div>
      <button onClick={onOpenCart} className="relative p-2 rounded-full bg-red-50 text-red-600">
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
}