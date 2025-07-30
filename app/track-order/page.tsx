// app/track-order/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface OrderDetails {
  id: string
  sale_date: string
  quantity: number
  bags_number: number
  total_amount: number
  payment_status: string
  order_status: string
  delivery_address: string
  delivery_phone: string
  customer: {
    name: string
    phone: string
    is_verified: boolean
  }
  product: {
    brand: string
    sub_type: string
    product_type: string
  }
}

const orderStatusSteps = [
  { key: 'pending', label: 'Order Placed', description: 'Your order has been received' },
  { key: 'confirmed', label: 'Confirmed', description: 'Order verified and confirmed' },
  { key: 'processing', label: 'Processing', description: 'Preparing your order' },
  { key: 'delivered', label: 'Delivered', description: 'Order delivered successfully' }
]

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setOrder(null)

    try {
      const { data, error } = await supabase
        .from('sales')
        .select(`
          id,
          sale_date,
          quantity,
          bags_number,
          total_amount,
          payment_status,
          order_status,
          delivery_address,
          delivery_phone,
          customer:customers!inner(name, phone, is_verified),
          product:products!inner(brand, sub_type, product_type)
        `)
        .eq('id', orderId)
        .eq('source', 'website')
        .single()

      if (error || !data) {
        setError('Order not found. Please check your order ID and try again.')
      } else {
        // Transform the data to ensure customer and product are single objects
        const transformedData = {
          ...data,
          customer: Array.isArray(data.customer) ? data.customer[0] : data.customer,
          product: Array.isArray(data.product) ? data.product[0] : data.product
        }
        setOrder(transformedData as OrderDetails)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIndex = (status: string) => {
    return orderStatusSteps.findIndex(step => step.key === status)
  }

  const getStatusColor = (status: string, currentStatus: string) => {
    const currentIndex = getStatusIndex(currentStatus)
    const statusIndex = getStatusIndex(status)
    
    if (statusIndex <= currentIndex) {
      return 'bg-green-600'
    }
    return 'bg-gray-300'
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order ID to check the status</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                Order ID
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your order ID (e.g., 123e4567-e89b-12d3-a456-426614174000)"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Status Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Order Status</h2>
              
              {!order.customer.is_verified && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Verification Pending:</strong> Our team will contact you shortly at {order.customer.phone} to verify your order.
                  </p>
                </div>
              )}

              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-300">
                  <div 
                    className="h-full bg-green-600 transition-all duration-500"
                    style={{ 
                      width: `${(getStatusIndex(order.order_status) / (orderStatusSteps.length - 1)) * 100}%` 
                    }}
                  />
                </div>

                {/* Status Steps */}
                <div className="relative flex justify-between">
                  {orderStatusSteps.map((step, index) => (
                    <div key={step.key} className="flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-colors ${
                          getStatusColor(step.key, order.order_status)
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium text-gray-900">{step.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-medium">{formatDate(order.sale_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer Name</p>
                  <p className="font-medium">{order.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact Number</p>
                  <p className="font-medium">{order.customer.phone}</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {order.product.brand} {order.product.sub_type || order.product.product_type}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Quantity: {order.quantity} tons ({order.bags_number} bags)
                    </p>
                  </div>
                  <p className="font-semibold text-lg">{formatCurrency(order.total_amount)}</p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Delivery Address</p>
                  <p className="font-medium">{order.delivery_address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact for Delivery</p>
                  <p className="font-medium">{order.delivery_phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                    order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <p className="text-gray-700 mb-2">Need help with your order?</p>
              <p className="text-lg font-semibold">Call us at: +92 300 1234567</p>
              <p className="text-sm text-gray-600 mt-1">Monday - Saturday, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}