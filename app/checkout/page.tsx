// app/checkout/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { supabase, WebsiteSettings } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalAmount, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState<WebsiteSettings | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cash',
    notes: ''
  })

  useEffect(() => {
    fetchSettings()
    // Check if cart is empty after component mounts
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [])

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('website_settings')
      .select('*')
    
    if (data) {
      const settingsObj: any = {}
      data.forEach(item => {
        settingsObj[item.key] = item.value
      })
      setSettings(settingsObj as WebsiteSettings)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Starting order submission...')
      
      // Create orders for each product
      for (const item of items) {
        console.log('Processing item:', item)
        
        // First check if customer exists
        let customerId
        const { data: existingCustomer, error: customerCheckError } = await supabase
          .from('customers')
          .select('id')
          .eq('phone', formData.phone)
          .single()

        if (customerCheckError && customerCheckError.code !== 'PGRST116') {
          console.error('Error checking customer:', customerCheckError)
          throw customerCheckError
        }

        if (existingCustomer) {
          customerId = existingCustomer.id
          console.log('Found existing customer:', customerId)
        } else {
          // Create new customer
          console.log('Creating new customer...')
          const { data: newCustomer, error: customerError } = await supabase
            .from('customers')
            .insert({
              name: formData.name,
              phone: formData.phone,
              email: formData.email || null,
              address: formData.address,
              source: 'website',
              is_verified: false
            })
            .select()
            .single()

          if (customerError) {
            console.error('Error creating customer:', customerError)
            throw customerError
          }
          customerId = newCustomer.id
          console.log('Created new customer:', customerId)
        }

        // Calculate bags (20 bags per ton)
        const bagsNumber = Math.ceil(item.quantity * 20)
        console.log('Calculated bags:', bagsNumber)

        // Create sale record
        console.log('Creating sale record...')
        const saleData = {
          customer_id: customerId,
          product_id: item.product.id,
          quantity: item.quantity,
          bags_number: bagsNumber,
          rate: item.product.price_per_bag,
          total_amount: bagsNumber * item.product.price_per_bag,
          sale_date: new Date().toISOString().split('T')[0],
          payment_status: 'pending',
          source: 'website',
          order_status: 'pending',
          delivery_address: formData.address,
          delivery_phone: formData.phone,
          order_notes: formData.notes || null
        }
        console.log('Sale data:', saleData)
        
        const { data: sale, error: saleError } = await supabase
          .from('sales')
          .insert(saleData)
          .select()
          .single()

        if (saleError) {
          console.error('Error creating sale:', saleError)
          throw saleError
        }
        console.log('Created sale:', sale)

        // Update inventory
        console.log('Updating inventory...')
        // First get current stock
        const { data: inventoryData, error: inventoryFetchError } = await supabase
          .from('inventory')
          .select('current_stock')
          .eq('product_id', item.product.id)
          .single()

        if (!inventoryFetchError && inventoryData) {
          const newStock = Math.max(0, inventoryData.current_stock - bagsNumber)
          console.log('Current stock:', inventoryData.current_stock, 'New stock:', newStock)
          
          const { error: inventoryError } = await supabase
            .from('inventory')
            .update({ 
              current_stock: newStock,
              last_updated: new Date().toISOString()
            })
            .eq('product_id', item.product.id)

          if (inventoryError) {
            console.error('Inventory update error:', inventoryError)
            // Continue anyway - don't fail the order
          } else {
            console.log('Inventory updated successfully')
          }
        } else {
          console.log('No inventory record found or error:', inventoryFetchError)
        }
      }

      // Clear cart and redirect
      console.log('Order created successfully, clearing cart...')
      clearCart()
      router.push(`/order-success?phone=${formData.phone}`)
    } catch (error) {
      console.error('Error creating order:', error)
      let errorMessage = 'Failed to create order. Please try again.'
      
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = JSON.stringify(error)
      }
      
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Return null if cart is empty (will redirect in useEffect)
  if (items.length === 0) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-3">Order Summary</h2>
        {items.map(item => (
          <div key={item.product.id} className="flex justify-between py-2">
            <span>
              {item.product.brand} {item.product.sub_type} - {item.quantity} tons ({item.bags} bags)
            </span>
            <span>Rs. {item.total.toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2 font-semibold">
          <div className="flex justify-between">
            <span>Total:</span>
            <span>Rs. {getTotalAmount().toLocaleString()}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="+92 300 1234567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Delivery Address *</label>
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="cash">Cash on Delivery</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Order Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={2}
            placeholder="Any special instructions for delivery..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-3 rounded font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}