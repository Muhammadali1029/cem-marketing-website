// app/order-success/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase, WebsiteSettings } from '@/lib/supabase'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone')
  const [settings, setSettings] = useState<WebsiteSettings | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data } = await supabase
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

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="text-green-500 text-6xl mb-4">✓</div>
      
      <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
      
      <p className="text-lg mb-6">
        {settings?.order_messages.confirmation}
      </p>

      <div className="bg-gray-100 p-6 rounded mb-6">
        <p className="mb-2">Your order reference: <strong>{phone}</strong></p>
        <p className="text-sm text-gray-600">
          Please keep this number for tracking your order
        </p>
      </div>

      {settings && (
        <div className="border p-4 rounded mb-6">
          <h3 className="font-semibold mb-2">Contact Us:</h3>
          <p>Phone: {settings.company_info.phone}</p>
          <p>Email: {settings.company_info.email}</p>
        </div>
      )}

      <div className="space-x-4">
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </Link>
        <Link
          href={`/orders?phone=${phone}`}
          className="inline-block bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
        >
          Track Order
        </Link>
      </div>
    </div>
  )
}