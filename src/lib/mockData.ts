import { MenuItem } from '@/types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: { id: 'Bulgogi Beef Bowl', en: 'Bulgogi Beef Bowl' },
    description: { id: 'Daging sapi iris marinate khas Aneka Rasa', en: 'Marinated sliced beef with rice' },
    price: 12000,
    category: 'makanan_utama',
    imageUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=80',
    stock: 25,
    isAvailable: true
  },
  {
    id: 'm2',
    name: { id: 'Bumbu Rendang Instant (1kg)', en: 'Instant Rendang Paste (1kg)' },
    description: { id: 'Bumbu mentah siap pakai resep Nusantara', en: 'Ready to cook authentic Rendang paste' },
    price: 15000,
    category: 'bahan_mentah',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    stock: 10,
    isAvailable: true,
    unit: 'pack'
  },
  {
    id: 'm3',
    name: { id: 'Jastip Logistics Indo-Korea', en: 'Logistic Shipping Service' },
    description: { id: 'Layanan titip kirim barang/paket 3-5 hari', en: 'Express shipping service for packages' },
    price: 10000,
    category: 'jastip_logistik',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    stock: 99,
    isAvailable: true,
    unit: 'kg'
  }
];