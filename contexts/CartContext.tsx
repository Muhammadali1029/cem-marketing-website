// contexts/CartContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product, CartItem } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalBags: () => number
  getTotalAmount: () => number
  sessionId: string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    // Get or create session ID
    let sid = localStorage.getItem('cart_session_id')
    if (!sid) {
      sid = uuidv4()
      localStorage.setItem('cart_session_id', sid)
    }
    setSessionId(sid)

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart_items')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart_items', JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product, quantity: number) => {
    setItems(current => {
      const existing = current.find(item => item.product.id === product.id)
      if (existing) {
        return current.map(item =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                bags: (item.quantity + quantity) * 20,
                total: (item.quantity + quantity) * 20 * product.price_per_bag
              }
            : item
        )
      }
      return [...current, {
        product,
        quantity,
        bags: quantity * 20,
        total: quantity * 20 * product.price_per_bag
      }]
    })
  }

  const removeFromCart = (productId: string) => {
    setItems(current => current.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setItems(current =>
      current.map(item =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
              bags: quantity * 20,
              total: quantity * 20 * item.product.price_per_bag
            }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalBags = () => {
    return items.reduce((total, item) => total + item.bags, 0)
  }

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + item.total, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalBags,
      getTotalAmount,
      sessionId
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}