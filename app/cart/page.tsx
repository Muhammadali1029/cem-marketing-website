// app/cart/page.tsx
'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalBags, getTotalAmount, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link href="/" className="btn btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Cart Header */}
              <div className="border-b px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900">Items ({items.length})</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y">
                {items.map(item => (
                  <div key={item.product.id} className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image Placeholder */}
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg w-24 h-24 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {item.product.brand}
                              {item.product.sub_type && <span className="font-normal text-gray-600"> - {item.product.sub_type}</span>}
                            </h3>
                            <p className="text-sm text-gray-600">{item.product.product_type}</p>
                            <p className="text-sm text-gray-500 mt-1">Rs. {item.product.price_per_bag} per bag</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-600 p-1"
                            title="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <label className="text-sm text-gray-600">Quantity:</label>
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.product.id, Math.max(0.5, item.quantity - 0.5))}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="0.5"
                                step="0.5"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.product.id, parseFloat(e.target.value) || 0.5)}
                                className="w-16 text-center border-x px-2 py-1 focus:outline-none"
                              />
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 0.5)}
                                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm text-gray-600">tons ({item.bags} bags)</span>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">Rs. {item.total.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Summary Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs. {getTotalAmount().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Bags</span>
                  <span className="font-medium">{getTotalBags()} bags</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-green-600 font-medium">Calculated at checkout</span>
                </div>
              </div>
              
              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-blue-600">Rs. {getTotalAmount().toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="btn btn-primary w-full text-center mb-4">
                Proceed to Checkout
              </Link>
              
              {/* Continue Shopping */}
              <Link href="/" className="btn btn-outline w-full text-center">
                Continue Shopping
              </Link>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Your information is protected by 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}