// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase, Product } from '@/lib/supabase'
import { useCart } from '@/contexts/CartContext'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart, items } = useCart()
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('website_products')
        .select('*')
        .order('brand', { ascending: true })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuantityChange = (productId: string, value: string) => {
    const qty = parseFloat(value) || 0
    setQuantities(prev => ({ ...prev, [productId]: qty }))
  }

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1
    if (qty > 0) {
      addToCart(product, qty)
      setQuantities(prev => ({ ...prev, [product.id]: 0 }))
      alert(`Added ${qty} tons (${qty * 20} bags) to cart`)
    }
  }

  const getCartQuantity = (productId: string) => {
    const item = items.find(i => i.product.id === productId)
    return item ? item.quantity : 0
  }

  if (loading) return <div>Loading products...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold">
              {product.brand} {product.sub_type && `- ${product.sub_type}`}
            </h3>
            
            <p className="text-gray-600 mb-2">{product.product_type}</p>
            
            <div className="mb-3">
              <p className="text-2xl font-bold">Rs. {product.price_per_bag}/bag</p>
              <p className="text-sm text-gray-500">
                Rs. {product.price_per_bag * 20}/ton (20 bags)
              </p>
            </div>

            <div className="mb-3">
              <span className={`inline-block px-2 py-1 rounded text-sm ${
                product.stock_status === 'in_stock' 
                  ? 'bg-green-100 text-green-800'
                  : product.stock_status === 'low_stock'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stock_status === 'in_stock' && 'In Stock'}
                {product.stock_status === 'low_stock' && 'Limited Stock'}
                {product.stock_status === 'out_of_stock' && 'Out of Stock'}
              </span>
            </div>

            {product.stock_status !== 'out_of_stock' && (
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  placeholder="Tons"
                  value={quantities[product.id] || ''}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  className="border rounded px-2 py-1 w-24"
                />
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            )}

            {getCartQuantity(product.id) > 0 && (
              <p className="text-sm text-green-600 mt-2">
                {getCartQuantity(product.id)} tons in cart
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}