export type Category = 'makanan_matang' | 'bahan_mentah';

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

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: { id: 'Bulgogi Beef Bowl', en: 'Bulgogi Beef Bowl' },
    description: { id: 'Nasi dengan daging sapi iris marinasi khas Aneka Rasa (Siap Makan)', en: 'Marinated sliced beef with rice' },
    price: 12000,
    category: 'makanan_matang',
    imageUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=80',
    stock: 25,
    isAvailable: true
  },
  {
    id: 'm2',
    name: { id: 'Nasi Goreng Spesial', en: 'Special Fried Rice' },
    description: { id: 'Nasi goreng khas Nusantara dengan telur dan ayam suwir', en: 'Indonesian fried rice with egg and chicken' },
    price: 10000,
    category: 'makanan_matang',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    isAvailable: true
  },
  {
    id: 'm3',
    name: { id: 'Bumbu Rendang Instant (1kg)', en: 'Instant Rendang Paste (1kg)' },
    description: { id: 'Bumbu mentah siap pakai resep otentik Nusantara', en: 'Ready to cook authentic Rendang paste' },
    price: 15000,
    category: 'bahan_mentah',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    stock: 10,
    isAvailable: true,
    unit: 'pack'
  },
  {
    id: 'm4',
    name: { id: 'Cabai Rawit Segar (500g)', en: 'Fresh Bird Eye Chili (500g)' },
    description: { id: 'Bahan masakan segar untuk bumbu olahan', en: 'Fresh raw bird eye chili' },
    price: 8000,
    category: 'bahan_mentah',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    stock: 15,
    isAvailable: true,
    unit: 'pack'
  }
];
