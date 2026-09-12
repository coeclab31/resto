'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import FoodCard from '@/components/FoodCard';
import { INITIAL_MENU_ITEMS } from '@/lib/mockData';

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto border-x border-gray-200">
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <main className="p-3 grid grid-cols-2 gap-2.5">
        {INITIAL_MENU_ITEMS.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </main>
    </div>
  );
}