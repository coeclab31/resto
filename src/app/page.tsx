'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import FoodCard from '@/components/FoodCard';
import { INITIAL_MENU_ITEMS } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { formatKRW } from '@/lib/utils';
import { ShoppingBag, X, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  
  const { cart, updateQuantity, totalAmount, totalItems, clearCart } = useCart();

  const categories = [
    { id: 'all', label: 'Semua Menu' },
    { id: 'makanan_matang', label: '🍱 Makanan Matang' },
    { id: 'bahan_mentah', label: '🥩 Bahan & Bumbu Mentah' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? INITIAL_MENU_ITEMS
    : INITIAL_MENU_ITEMS.filter(item => item.category === selectedCategory);

  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !tableOrAddress) return;
    setIsOrderSuccess(true);
    setTimeout(() => {
      clearCart();
      setIsOrderSuccess(false);
      setIsCheckoutModalOpen(false);
      setIsCartOpen(false);
      setCustomerName('');
      setTableOrAddress('');
    }, 2500);
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
          <a href="/admin" className="text-xs bg-white text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-50 transition">
            Portal Admin
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Kolom Kiri: Filter & Grid Produk */}
        <div className="flex-1">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Sidebar Keranjang Belanja (Desktop) */}
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
                onClick={() => setIsCheckoutModalOpen(true)} 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl shadow transition"
              >
                Proses Pembelian / Checkout
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal Form Checkout Pembelian */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsCheckoutModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            {isOrderSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-16 h-16 text-green-550 text-green-500 mx-auto" />
                <h3 className="text-xl font-bold text-gray-900">Pesanan Berhasil Dibuat!</h3>
                <p className="text-xs text-gray-500">Terima kasih, pesanan Anda sedang diproses oleh dapur Aneka Rasa.</p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Konfirmasi & Form Pembelian</h3>
                <div className="mb-4 bg-gray-50 p-3 rounded-xl space-y-1 text-xs">
                  <p className="font-semibold text-gray-700">Ringkasan Pesanan ({totalItems} item):</p>
                  <p className="text-red-600 font-extrabold text-sm">{formatKRW(totalAmount)}</p>
                </div>
                <form onSubmit={handleProcessCheckout} className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nama Pemesan</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nomor Meja / Alamat Pengiriman</label>
                    <input
                      type="text"
                      required
                      value={tableOrAddress}
                      onChange={(e) => setTableOrAddress(e.target.value)}
                      className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Contoh: Meja 04 atau Alamat Rumah"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl shadow transition mt-2"
                  >
                    Bayar & Selesaikan Pesanan
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
