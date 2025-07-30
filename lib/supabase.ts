// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Product {
  id: string
  product_type: string
  brand: string
  sub_type: string
  price_per_bag: number
  description: string
  website_description: string
  image_url: string
  current_stock: number
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock'
}

export interface CartItem {
  product: Product
  quantity: number // in tons
  bags: number
  total: number
}

export interface WebsiteSettings {
  bank_details: {
    bank_name: string
    account_title: string
    account_number: string
    iban: string
    branch_code: string
  }
  company_info: {
    name: string
    phone: string
    email: string
    address: string
    delivery_charges: number
    minimum_order: number
  }
  order_messages: {
    confirmation: string
    payment_instructions: string
  }
}