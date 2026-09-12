'use client';

import React, { useState } from 'react';
import { createOrder } from '@/lib/firebaseServices';
import { Package, Send } from 'lucide-react';

export default function JastipForm() {
  const [weight, setWeight] = useState(1);
  const [senderName, setSenderName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const pricePerKg = 10000; // 10,000 KRW / kg
  const totalPrice = weight * pricePerKg;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('Mengirim data...');

    const res = await createOrder({
      customerName: senderName,
      phone: '-',
      address: 'Jastip Logistics Direct',
      items: [
        {
          menuItem: {
            id: 'jastip-custom',
            name: { id: `Jastip Paket (${itemDesc})`, en: `Jastip Package (${itemDesc})` },
            description: { id: `Berat: ${weight} kg`, en: `Weight: ${weight} kg` },
            price: pricePerKg,
            category: 'jastip_logistik',
            imageUrl: '',
            stock: 99,
            isAvailable: true
          },
          quantity: weight
        }
      ],
      totalAmount: totalPrice,
      serviceType: 'jastip',
      status: 'pending'
    });

    if (res.success) {
      setStatusMsg('✅ Permintaan Jastip Berhasil Disimpan ke Firebase!');
      setSenderName('');
      setItemDesc('');
    } else {
      setStatusMsg('❌ Gagal menyimpan pesanan.');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-red-600" /> Layanan Titip Kirim (Jastip Korea-Indo)
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Nama Pengirim</label>
          <input 
            type="text" 
            required 
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none" 
            placeholder="Nama lengkap kamu"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Deskripsi Barang / Paket</label>
          <input 
            type="text" 
            required 
            value={itemDesc}
            onChange={(e) => setItemDesc(e.target.value)}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none" 
            placeholder="Contoh: Pakaian, Skincare, Dokumen"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Estimasi Berat (Kg)</label>
          <input 
            type="number" 
            min="1" 
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none" 
          />
        </div>
        <div className="p-3 bg-red-50 rounded-xl flex justify-between items-center font-bold text-red-600">
          <span>Total Est. Biaya:</span>
          <span>₩{totalPrice.toLocaleString('ko-KR')}</span>
        </div>
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition flex justify-center items-center gap-2">
          <Send className="w-4 h-4" /> Kirim Pengajuan Jastip
        </button>
        {statusMsg && <p className="text-center font-medium text-gray-600 mt-2">{statusMsg}</p>}
      </form>
    </div>
  );
}
