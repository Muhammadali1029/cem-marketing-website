// app/cart/page.tsx
'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalBags, getTotalAmount, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl mb-4">Your cart is empty</h2>
        <Link href="/" className="text-blue-500 hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.product.id} className="border p-4 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">
                  {item.product.brand} {item.product.sub_type && `- ${item.product.sub_type}`}
                </h3>
                <p className="text-gray-600">{item.product.product_type}</p>
                <p className="text-sm">Rate: Rs. {item.product.price_per_bag}/bag</p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <label>Tons:</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product.id, parseFloat(e.target.value) || 0)}
                    className="border rounded px-2 py-1 w-20"
                  />
                </div>
                <p className="text-sm text-gray-600">{item.bags} bags</p>
                <p className="font-semibold">Rs. {item.total.toLocaleString()}</p>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 text-sm hover:underline mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total ({getTotalBags()} bags):</span>
          <span>Rs. {getTotalAmount().toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          href="/checkout"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Proceed to Checkout
        </Link>
        <button
          onClick={clearCart}
          className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}