import React from 'react';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'Aneka Rasa Restoran & Jastip',
  description: 'Aplikasi Pemesanan Makanan & Jastip Korea',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-100">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}