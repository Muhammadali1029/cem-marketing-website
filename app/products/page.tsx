// app/products/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase, Product } from '@/lib/supabase'
import { useCart } from '@/contexts/CartContext'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart, items } = useCart()
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

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
      
      // Show success notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up z-50'
      notification.innerHTML = `Added ${qty} tons (${qty * 20} bags) to cart!`
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    }
  }

  const getCartQuantity = (productId: string) => {
    const item = items.find(i => i.product.id === productId)
    return item ? item.quantity : 0
  }

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.product_type === selectedCategory
    const matchesSearch = product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sub_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.product_type.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.product_type)))]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-navy text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-blue-100">Premium quality cement from trusted manufacturers</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by brand or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-brand-blue text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="card card-hover p-6 animate-fade-in">
              {/* Product Image Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="text-gray-500 font-semibold">{product.brand}</p>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {product.brand}
                </h3>
                {product.sub_type && (
                  <p className="text-sm text-gray-600">{product.sub_type}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">{product.product_type}</p>
              </div>
              
              {/* Pricing */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-brand-blue">Rs. {product.price_per_bag}</p>
                  <p className="text-sm text-gray-500">/bag</p>
                </div>
                <p className="text-sm text-gray-600">
                  Rs. {(product.price_per_bag * 20).toLocaleString()} per ton (20 bags)
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                <span className={`badge ${
                  product.stock_status === 'in_stock' 
                    ? 'badge-success'
                    : product.stock_status === 'low_stock'
                    ? 'badge-warning'
                    : 'badge-error'
                }`}>
                  {product.stock_status === 'in_stock' && '✓ In Stock'}
                  {product.stock_status === 'low_stock' && '⚠ Limited Stock'}
                  {product.stock_status === 'out_of_stock' && '✗ Out of Stock'}
                </span>
              </div>

              {/* Add to Cart Section */}
              {product.stock_status !== 'out_of_stock' ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      placeholder="Tons"
                      value={quantities[product.id] || ''}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      className="input flex-1"
                    />
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-primary"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add
                    </button>
                  </div>

                  {getCartQuantity(product.id) > 0 && (
                    <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {getCartQuantity(product.id)} tons in cart
                    </p>
                  )}
                </div>
              ) : (
                <button disabled className="btn btn-outline w-full opacity-50 cursor-not-allowed">
                  Out of Stock
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}