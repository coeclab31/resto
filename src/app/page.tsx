'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import FoodCard from '@/components/FoodCard';
import { INITIAL_MENU_ITEMS } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { formatKRW } from '@/lib/utils';
import { ShoppingBag, X } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cart, updateQuantity, totalAmount, totalItems } = useCart();

  const categories = [
    { id: 'all', label: 'Semua Menu' },
    { id: 'makanan_matang', label: '🍱 Makanan Matang' },
    { id: 'bahan_mentah', label: '🥩 Bahan & Bumbu Mentah' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? INITIAL_MENU_ITEMS
    : INITIAL_MENU_ITEMS.filter(item => item.category === selectedCategory);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert('Pesanan berhasil dibuat!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      {/* Hero Banner */}
      <div className="bg-red-600 text-white py-8 px-4 sm:px-8 text-center sm:text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold">Aneka Rasa Restoran</h1>
            <p className="text-red-100 text-sm sm:text-base mt-1">Hidangan Olahan Matang & Bahan Bumbu Mentah Otentik</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Kolom Kiri: Filter Kategori & Grid Produk */}
        <div className="flex-1">
          {/* Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid Produk Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Sidebar Keranjang Belanja (Tampil di Laptop/Desktop) */}
        <div className="hidden lg:block w-80 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-fit sticky top-20">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4 border-b pb-3">
            <ShoppingBag className="w-5 h-5 text-red-600" /> Keranjang Belanja ({totalItems})
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">Keranjang belanja kosong</p>
          ) : (
            <div className="space-y-4">
              <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
                {cart.map(({ menuItem, quantity }) => (
                  <div key={menuItem.id} className="flex justify-between items-center text-sm border-b pb-2">
                    <div>
                      <p className="font-semibold text-gray-800 line-clamp-1">{menuItem.name.id}</p>
                      <p className="text-xs text-red-600 font-medium">{formatKRW(menuItem.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(menuItem.id, -1)} className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold">-</button>
                      <span className="text-xs font-bold">{quantity}</span>
                      <button onClick={() => updateQuantity(menuItem.id, 1)} className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold">+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-red-600">{formatKRW(totalAmount)}</span>
              </div>
              <button 
                onClick={handleCheckout} 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl shadow transition"
              >
                Checkout Pesanan
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal Keranjang Belanja (Mobile Slide-over) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-white h-full p-5 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-red-600" /> Keranjang ({totalItems})
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {cart.length === 0 ? (
                <p className="text-gray-400 text-xs text-center py-8">Keranjang belanja kosong</p>
              ) : (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                  {cart.map(({ menuItem, quantity }) => (
                    <div key={menuItem.id} className="flex justify-between items-center text-xs border-b pb-2">
                      <div>
                        <p className="font-semibold text-gray-800 line-clamp-1">{menuItem.name.id}</p>
                        <p className="text-red-600 font-bold">{formatKRW(menuItem.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(menuItem.id, -1)} className="px-2 py-0.5 bg-gray-200 rounded font-bold">-</button>
                        <span className="font-bold">{quantity}</span>
                        <button onClick={() => updateQuantity(menuItem.id, 1)} className="px-2 py-0.5 bg-gray-200 rounded font-bold">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-sm text-gray-900 mb-3">
                  <span>Total:</span>
                  <span className="text-red-600">{formatKRW(totalAmount)}</span>
                </div>
                <button 
                  onClick={handleCheckout} 
                  className="w-full bg-red-600 text-white font-bold py-2.5 rounded-xl"
                >
                  Checkout Pesanan
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
