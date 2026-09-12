'use client';

import React, { useState } from 'react';
import { MenuItem, Category } from '@/lib/mockData';
import { Lock, PlusCircle, LogOut, PackagePlus } from 'lucide-react';

interface AdminProductFormProps {
  onAddItem: (newItem: MenuItem) => void;
}

export default function AdminProductForm({ onAddItem }: AdminProductFormProps) {
  // State Authentication Admin Sederhana
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // State Form Produk
  const [nameIndo, setNameIndo] = useState('');
  const [nameEng, setNameEng] = useState('');
  const [descIndo, setDescIndo] = useState('');
  const [descEng, setDescEng] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>('');
  const [category, setCategory] = useState<Category>('makanan_matang');
  const [imageUrl, setImageUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handler Login Admin (Default Credential: admin / admin123)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Username atau password salah! (Gunakan: admin / admin123)');
    }
  };

  // Handler Tambah Produk
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameIndo || !price || !stock) return;

    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: {
        id: nameIndo,
        en: nameEng || nameIndo,
      },
      description: {
        id: descIndo,
        en: descEng || descIndo,
      },
      price: Number(price),
      stock: Number(stock),
      category: category,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      isAvailable: true,
    };

    onAddItem(newItem);

    // Reset Form
    setNameIndo('');
    setNameEng('');
    setDescIndo('');
    setDescEng('');
    setPrice('');
    setStock('');
    setImageUrl('');
    setSuccessMsg('✅ Produk jualan berhasil ditambahkan!');

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // 1. TAMPILAN JIKA BELUM LOGIN
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Login Admin Resto</h2>
          <p className="text-xs text-gray-500 mt-1">Masuk untuk menambah item jualan baru</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Masukkan password"
            />
          </div>

          {loginError && <p className="text-red-500 text-xs font-semibold">{loginError}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition"
          >
            Masuk Admin
          </button>
        </form>
      </div>
    );
  }

  // 2. TAMPILAN FORM TAMBAH JUALAN (SETELAH LOGIN)
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center border-b pb-4 mb-5">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <PackagePlus className="w-5 h-5 text-red-600" /> Tambah Item Jualan Baru
        </h2>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="text-xs font-semibold text-gray-500 hover:text-red-600 flex items-center gap-1"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </div>

      <form onSubmit={handleSubmitProduct} className="space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Nama Produk (Indonesia)</label>
            <input
              type="text"
              required
              value={nameIndo}
              onChange={(e) => setNameIndo(e.target.value)}
              className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Contoh: Rendang Sapi"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Nama Produk (Inggris/Opsional)</label>
            <input
              type="text"
              value={nameEng}
              onChange={(e) => setNameEng(e.target.value)}
              className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Contoh: Beef Rendang"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Kategori Jualan</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500 bg-white"
            >
              <option value="makanan_matang">🍱 Makanan Matang</option>
              <option value="bahan_mentah">🥩 Bahan & Bumbu Mentah</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Harga (KRW / ₩)</label>
            <input
              type="number"
              required
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
              className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Contoh: 12000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Jumlah Stok</label>
            <input
              type="number"
              required
              min="1"
              value={stock}
              onChange={(e) => setStock(e.target.value ? Number(e.target.value) : '')}
              className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Contoh: 20"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">URL Gambar (Opsional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="https://..."
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
          <textarea
            rows={2}
            value={descIndo}
            onChange={(e) => setDescIndo(e.target.value)}
            className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Jelaskan detail menu atau bahan..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition flex justify-center items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" /> Tambah Ke Menu Jualan
        </button>

        {successMsg && <p className="text-center font-bold text-green-600 text-xs mt-2">{successMsg}</p>}
      </form>
    </div>
  );
}
