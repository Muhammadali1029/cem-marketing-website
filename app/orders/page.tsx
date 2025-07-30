// app/orders/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Order {
  id: string
  sale_date: string
  quantity: number
  bags_number: number
  total_amount: number
  payment_status: string
  order_status: string
  product: {
    brand: string
    sub_type: string
    product_type: string
  }
}

export default function OrdersPage() {
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSearched(true)

    try {
      // First find customer by phone
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('phone', phone)
        .single()

      if (customer) {
        // Fetch orders for this customer
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
            product:products(brand, sub_type, product_type)
          `)
          .eq('customer_id', customer.id)
          .eq('source', 'website')
          .order('sale_date', { ascending: false })

        if (error) throw error
        setOrders(data || [])
      } else {
        setOrders([])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600'
      case 'partial': return 'text-yellow-600'
      case 'pending': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Track Your Orders</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search Orders'}
          </button>
        </div>
      </form>

      {searched && (
        <>
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No orders found for this phone number
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">
                        {order.product.brand} {order.product.sub_type && `- ${order.product.sub_type}`}
                      </h3>
                      <p className="text-gray-600">{order.product.product_type}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${getStatusColor(order.order_status)}`}>
                      {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>Date: {new Date(order.sale_date).toLocaleDateString()}</p>
                      <p>Quantity: {order.quantity} tons ({order.bags_number} bags)</p>
                    </div>
                    <div className="text-right">
                      <p>Total: Rs. {order.total_amount.toLocaleString()}</p>
                      <p className={getPaymentStatusColor(order.payment_status)}>
                        Payment: {order.payment_status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}