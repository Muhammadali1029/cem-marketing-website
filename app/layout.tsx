// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'Cem Marketing - Quality Cement Supplier',
  description: 'Order cement online with cash on delivery or bank transfer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="border-b p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Cem Marketing</h1>
              <nav className="flex gap-4">
                <a href="/" className="hover:underline">Products</a>
                <a href="/cart" className="hover:underline">Cart</a>
                <a href="/orders" className="hover:underline">Track Order</a>
              </nav>
            </div>
          </header>
          <main className="container mx-auto p-4">
            {children}
          </main>
          <footer className="border-t mt-8 p-4 text-center text-gray-600">
            <p>&copy; 2025 Cem Marketing. All rights reserved.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}