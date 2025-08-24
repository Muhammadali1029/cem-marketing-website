<<<<<<< HEAD
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
<<<<<<< HEAD
    <main className="bg-white text-gray-800">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
=======
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
>>>>>>> parent of b7890d4 (MVP without any styling or content)
=======
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
>>>>>>> parent of 8c32ce0 (3rd commit)
