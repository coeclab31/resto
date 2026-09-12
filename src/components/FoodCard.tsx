'use client';

import React from 'react';
import { MenuItem } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { formatKRW } from '@/lib/utils';
import { Plus, ShoppingCart } from 'lucide-react';

interface FoodCardProps {
  item: MenuItem;
}

export default function FoodCard({ item }: FoodCardProps) {
  const { addToCart, cart } = useCart();

  const cartItem = cart.find((c) => c.menuItem.id === item.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="relative h-36 sm:h-44 w-full bg-gray-100 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name.id}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
            {item.category === 'makanan_matang' ? '🍱 Siap Saji' : '🥩 Bahan Mentah'}
          </span>
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1">{item.name.id}</h3>
          <p className="text-gray-500 text-xs line-clamp-2 mt-1 min-h-[2.25rem]">
            {item.description.id}
          </p>
          <div className="mt-2 text-red-600 font-extrabold text-sm sm:text-base">
            {formatKRW(item.price)}
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 pt-0">
        <button
          onClick={() => addToCart(item)}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          {currentQuantity > 0 ? (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Tambah ({currentQuantity})</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Tambah ke Keranjang</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
