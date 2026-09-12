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
  price: number; // Dalam Won (KRW)
  category: Category;
  imageUrl: string;
  stock: number;
  isAvailable: boolean;
  unit?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
