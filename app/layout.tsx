// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/contexts/CartContext'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cem Marketing - Leading Cement Supplier in Lahore | 28+ Years of Trust',
  description: 'Order premium quality cement online with cash on delivery or bank transfer. Serving Lahore and Punjab for over 28 years.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white`}>
        <CartProvider>
          {/* Header */}
          <header className="bg-white sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-brand-blue to-brand-navy text-white">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-2 text-sm">
                  <div className="flex items-center gap-6">
                    <a href="tel:+923001234567" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+92 300 1234567</span>
                    </a>
                    <a href="mailto:info@cemmarketing.pk" className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>info@cemmarketing.pk</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Mon-Sat: 9AM - 6PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="border-b border-gray-200 shadow-sm">
              <nav className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-brand-red to-brand-blue rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-2xl">CM</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">28</span>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-red bg-clip-text text-transparent">
                        CEM MARKETING
                      </h1>
                      <p className="text-xs text-gray-600 font-medium">Excellence Since 1997</p>
                    </div>
                  </Link>

                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/products" className="nav-link">Products</Link>
                    <Link href="/about" className="nav-link">About Us</Link>
                    <Link href="/projects" className="nav-link">Our Projects</Link>
                    <Link href="/contact" className="nav-link">Contact</Link>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <Link href="/track-order" className="hidden md:flex items-center gap-2 btn btn-ghost">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      <span>Track Order</span>
                    </Link>
                    <Link href="/cart" className="btn btn-primary shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Cart</span>
                    </Link>
                  </div>

                  {/* Mobile Menu Button */}
                  <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-auto">
            <div className="container mx-auto px-4 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-brand-blue rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">CM</span>
                    </div>
                    <h3 className="text-xl font-bold">CEM MARKETING</h3>
                  </div>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Your trusted cement supplier for over 28 years. We deliver quality construction materials with unmatched reliability and service.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="social-icon">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-icon">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-icon">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-3">
                    <li><Link href="/" className="footer-link">Home</Link></li>
                    <li><Link href="/products" className="footer-link">Products</Link></li>
                    <li><Link href="/about" className="footer-link">About Us</Link></li>
                    <li><Link href="/projects" className="footer-link">Our Projects</Link></li>
                    <li><Link href="/contact" className="footer-link">Contact</Link></li>
                  </ul>
                </div>

                {/* Customer Service */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
                  <ul className="space-y-3">
                    <li><Link href="/track-order" className="footer-link">Track Order</Link></li>
                    <li><Link href="/shipping" className="footer-link">Shipping Info</Link></li>
                    <li><Link href="/bulk-orders" className="footer-link">Bulk Orders</Link></li>
                    <li><Link href="/faq" className="footer-link">FAQ</Link></li>
                    <li><Link href="/support" className="footer-link">Support</Link></li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                  <ul className="space-y-4">
                    <li>
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>123 Main Road, Model Town<br />Lahore, Punjab 54000<br />Pakistan</span>
                      </a>
                    </li>
                    <li>
                      <a href="tel:+923001234567" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>+92 300 1234567</span>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@cemmarketing.pk" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>info@cemmarketing.pk</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 bg-black">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                  <p>&copy; 2025 CEM Marketing. All rights reserved.</p>
                  <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}