'use client';

import React from 'react';
import { formatKRW } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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

export default function FoodCard({ item }: { item: MenuItem }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between">
      <div>
        <div className="relative aspect-[4/3] w-full bg-gray-100">
          <img src={item.imageUrl} alt={item.name.id} className="w-full h-full object-cover" />
          {item.category === 'jastip_logistik' && (
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">JASTIP</span>
          )}
        </div>
        <div className="p-2.5">
          <h3 className="font-semibold text-gray-900 text-xs line-clamp-1">{item.name.id}</h3>
          <p className="text-gray-400 text-[10px] mt-0.5 line-clamp-2">{item.description.id}</p>
        </div>
      </div>
      <div className="p-2.5 pt-0 flex items-center justify-between">
        <span className="text-red-600 font-bold text-xs">{formatKRW(item.price)}</span>
        <button onClick={() => addToCart(item)} className="bg-red-600 text-white p-1.5 rounded-lg">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
