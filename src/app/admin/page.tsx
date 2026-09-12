'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import { INITIAL_MENU_ITEMS, MenuItem, Category } from '@/lib/mockData';
import { formatKRW } from '@/lib/utils';
import { 
  Lock, LogOut, PackagePlus, Edit, Trash2, 
  TrendingUp, ShoppingBag, DollarSign, PlusCircle, Check 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State di Admin: 'crud' | 'laporan'
  const [activeTab, setActiveTab] = useState<'crud' | 'laporan'>('crud');

  // State Management CRUD Menu
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [nameIndo, setNameIndo] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>('');
  const [category, setCategory] = useState<Category>('makanan_matang');
  const [imageUrl, setImageUrl] = useState('');

  // Mock Data Laporan Penjualan Sederhana
  const salesHistory = [
    { id: 'TRX-101', date: '2026-09-12 18:30', item: 'Bulgogi Beef Bowl', qty: 2, total: 24000, status: 'Selesai' },
    { id: 'TRX-102', date: '2026-09-12 19:15', item: 'Bumbu Rendang Instant', qty: 1, total: 15000, status: 'Selesai' },
    { id: 'TRX-103', date: '2026-09-12 20:00', item: 'Nasi Goreng Spesial', qty: 3, total: 30000, status: 'Selesai' },
  ];

  const totalOmset = salesHistory.reduce((sum, s) => sum + s.total, 0);

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Username/password salah! Gunakan: admin / admin123');
    }
  };

  // Create / Update Handler
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameIndo || !price || !stock) return;

    if (editingId) {
      // Update
      setItems(items.map(item => item.id === editingId ? {
        ...item,
        name: { id: nameIndo, en: nameIndo },
        price: Number(price),
        stock: Number(stock),
        category: category,
        imageUrl: imageUrl || item.imageUrl
      } : item));
      setEditingId(null);
    } else {
      // Create
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: { id: nameIndo, en: nameIndo },
        description: { id: 'Menu Restoran Aneka Rasa', en: 'Aneka Rasa Menu' },
        price: Number(price),
        stock: Number(stock),
        category: category,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        isAvailable: true
      };
      setItems([newItem, ...items]);
    }

    // Reset Form
    setNameIndo('');
    setPrice('');
    setStock('');
    setImageUrl('');
  };

  // Start Edit Handler
  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setNameIndo(item.name.id);
    setPrice(item.price);
    setStock(item.stock);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
  };

  // Delete Handler
  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus menu ini?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header onOpenCart={() => {}} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Login Admin Resto</h2>
              <p className="text-xs text-gray-500 mt-1">Masuk untuk mengelola resto & melihat laporan</p>
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
                  placeholder="admin"
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
                  placeholder="admin123"
                />
              </div>
              {loginError && <p className="text-red-500 text-xs font-semibold">{loginError}</p>}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition"
              >
                Masuk Dashboard Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onOpenCart={() => {}} />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1">
        {/* Admin Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border shadow-sm mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard Pengelolaan Resto</h1>
            <p className="text-xs text-gray-500">Kelola katalog menu jualan & pantau laporan pendapatan</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <button 
                onClick={() => setActiveTab('crud')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'crud' ? 'bg-white shadow text-red-600 font-bold' : 'text-gray-600'}`}
              >
                Kelola Menu (CRUD)
              </button>
              <button 
                onClick={() => setActiveTab('laporan')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'laporan' ? 'bg-white shadow text-red-600 font-bold' : 'text-gray-600'}`}
              >
                Laporan Penjualan
              </button>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-xs font-semibold text-gray-500 hover:text-red-600 flex items-center gap-1 border p-2 rounded-xl"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>
        </div>

        {/* TAB 1: CRUD KELOLA MENU */}
        {activeTab === 'crud' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Create/Update */}
            <div className="bg-white border rounded-2xl p-5 shadow-sm h-fit">
              <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2 border-b pb-3">
                <PackagePlus className="w-5 h-5 text-red-600" />
                {editingId ? 'Edit Menu Jualan' : 'Tambah Menu Jualan Baru'}
              </h2>
              <form onSubmit={handleSubmitProduct} className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nama Produk</label>
                  <input
                    type="text"
                    required
                    value={nameIndo}
                    onChange={(e) => setNameIndo(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Contoh: Rendang Sapi"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  >
                    <option value="makanan_matang">🍱 Makanan Matang</option>
                    <option value="bahan_mentah">🥩 Bahan & Bumbu Mentah</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Harga (₩)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="12000"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Stok</label>
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value ? Number(e.target.value) : '')}
                      className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">URL Gambar (Opsional)</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl transition flex justify-center items-center gap-1.5"
                >
                  {editingId ? <Check className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                  {editingId ? 'Simpan Perubahan' : 'Tambah Menu'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setEditingId(null); setNameIndo(''); setPrice(''); setStock(''); }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-1.5 rounded-xl transition text-xs"
                  >
                    Batal Edit
                  </button>
                )}
              </form>
            </div>

            {/* Tabel Daftar Menu (Read, Update, Delete) */}
            <div className="lg:col-span-2 bg-white border rounded-2xl p-5 shadow-sm overflow-hidden">
              <h2 className="font-bold text-gray-900 text-base mb-4 border-b pb-3">Daftar Menu Saat Ini ({items.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-600">
                      <th className="p-3">Menu</th>
                      <th className="p-3">Kategori</th>
                      <th className="p-3">Harga</th>
                      <th className="p-3">Stok</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-semibold text-gray-800 flex items-center gap-2">
                          <img src={item.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          {item.name.id}
                        </td>
                        <td className="p-3 text-xs">
                          {item.category === 'makanan_matang' ? '🍱 Matang' : '🥩 Mentah'}
                        </td>
                        <td className="p-3 font-bold text-red-600">{formatKRW(item.price)}</td>
                        <td className="p-3 font-medium">{item.stock}</td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LAPORAN PENJUALAN */}
        {activeTab === 'laporan' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border rounded-2xl p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Total Omset</p>
                  <h3 className="text-xl font-extrabold text-gray-900">{formatKRW(totalOmset)}</h3>
                </div>
              </div>
              <div className="bg-white border rounded-2xl p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Total Transaksi</p>
                  <h3 className="text-xl font-extrabold text-gray-900">{salesHistory.length} Transaksi</h3>
                </div>
              </div>
              <div className="bg-white border rounded-2xl p-4 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Status Sistem</p>
                  <h3 className="text-xl font-extrabold text-green-600">Aktif & Normal</h3>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 text-base mb-4 border-b pb-3">Riwayat Transaksi Penjualan</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-600">
                      <th className="p-3">ID Transaksi</th>
                      <th className="p-3">Waktu</th>
                      <th className="p-3">Item Dibeli</th>
                      <th className="p-3">Jumlah</th>
                      <th className="p-3">Total Bayar</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesHistory.map((trx) => (
                      <tr key={trx.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-800">{trx.id}</td>
                        <td className="p-3 text-gray-500">{trx.date}</td>
                        <td className="p-3 font-semibold">{trx.item}</td>
                        <td className="p-3">{trx.qty} pcs</td>
                        <td className="p-3 font-bold text-red-600">{formatKRW(trx.total)}</td>
                        <td className="p-3"><span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-bold">{trx.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
