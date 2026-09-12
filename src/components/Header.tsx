'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b px-4 sm:px-8 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-sm shadow-md">
            AR
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-base leading-tight">Aneka Rasa</h1>
            <span className="text-xs text-gray-500 hidden sm:inline-block">Restoran & Jastip Logistics Korea-Indo</span>
          </div>
        </div>
        
        {/* Tombol Keranjang (Aktif di Mobile, Buka Sidebar di Laptop) */}
        <button 
          onClick={onOpenCart} 
          className="relative p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="hidden sm:inline-block text-xs font-bold">Keranjang</span>
          {totalItems > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
