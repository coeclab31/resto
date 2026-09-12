import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { CartItem } from '@/context/CartContext';

export interface OrderData {
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  serviceType: 'resto' | 'jastip';
  status: 'pending' | 'processing' | 'completed';
  createdAt?: any;
}

// 1. Simpan Pesanan Baru ke Firestore Database
export async function createOrder(order: OrderData) {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error };
  }
}

// 2. Ambil Daftar Pesanan untuk Dashboard Admin
export async function getOrders() {
  try {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}
