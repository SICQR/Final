'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from "next";
import { dropService, Drop } from '@/lib/supabase'
import QRScanner from '@/components/QRScanner'

export default function ShopPage() {
  const [drops, setDrops] = useState<Drop[]>([])
  const [loading, setLoading] = useState(true)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [filter, setFilter] = useState<'all' | 'raw' | 'hung' | 'high' | 'super'>('all')

  useEffect(() => {
    const fetchDrops = async () => {
      try {
        const data = await dropService.getAll()
        setDrops(data)
      } catch (error) {
        console.error('Error fetching drops:', error)
        // Set mock data for demo
        setDrops([
          {
            id: '1',
            title: 'HOTMESS RAW Tee',
            description: 'Essential raw energy tee',
            price: 45,
            image_url: '',
            category: 'raw',
            in_stock: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'HUNG Oversized Hoodie',
            description: 'Comfort with attitude',
            price: 85,
            image_url: '',
            category: 'hung',
            in_stock: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'HIGH Frequency Cap',
            description: 'Elevate your headspace',
            price: 35,
            image_url: '',
            category: 'high',
            in_stock: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '4',
            title: 'SUPER Limited Edition',
            description: 'Only 50 made. Pure chaos.',
            price: 150,
            image_url: '',
            category: 'super',
            in_stock: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchDrops()
  }, [])

  const filteredDrops = filter === 'all' 
    ? drops 
    : drops.filter(drop => drop.category === filter)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'raw': return 'text-red-400'
      case 'hung': return 'text-hung'
      case 'high': return 'text-purple-400'
      case 'super': return 'text-hotpink'
      default: return 'text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 text-hung">
                Drops
              </h1>
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-800 rounded mx-auto w-96"></div>
                <div className="h-4 bg-gray-800 rounded mx-auto w-64"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="aspect-square bg-gray-800 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-800 rounded mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-800 rounded w-16"></div>
                    <div className="h-6 bg-gray-800 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 text-hung">
              Drops
            </h1>
            <p className="text-2xl text-gray-300 mb-4">
              RAW / HUNG / HIGH / SUPER — limited, loud, lethal.
            </p>
            <p className="text-lg text-hotpink italic mb-8">
              &ldquo;Wear the mess. Own the night.&rdquo;
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setShowQRScanner(true)}
                className="btn-primary"
              >
                📱 Scan QR Code
              </button>
              <button className="btn-secondary">
                🛍️ View Cart
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {['all', 'raw', 'hung', 'high', 'super'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category as any)}
                  className={`px-4 py-2 rounded-lg font-heading font-bold text-sm transition-colors ${
                    filter === category
                      ? 'bg-hotpink text-black'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {filteredDrops.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDrops.map((drop) => (
                <div key={drop.id} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                    {drop.image_url ? (
                      <img 
                        src={drop.image_url} 
                        alt={drop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <div className="text-center">
                          <span className="font-heading text-3xl block mb-2">{drop.title}</span>
                          <span className={`text-sm ${getCategoryColor(drop.category)}`}>
                            {drop.category.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {!drop.in_stock && (
                      <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                        <span className="text-red-400 font-heading text-xl">SOLD OUT</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-heading text-xl mb-2 group-hover:text-hotpink transition-colors">
                    {drop.title}
                  </h3>
                  <p className="text-gray-400 mb-3 text-sm">{drop.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-hung font-bold text-xl">£{drop.price}</span>
                    <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
                      drop.in_stock ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'
                    }`}>
                      {drop.in_stock ? 'Available' : 'Sold Out'}
                    </span>
                  </div>
                  
                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                      drop.in_stock
                        ? 'btn-primary'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!drop.in_stock}
                  >
                    {drop.in_stock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-400 mb-6">
                No drops found for &ldquo;{filter.toUpperCase()}&rdquo; category
              </p>
              <button
                onClick={() => setFilter('all')}
                className="btn-secondary"
              >
                Show All Drops
              </button>
            </div>
          )}

          <div className="text-center mt-16">
            <p className="text-gray-400 mb-4">
              New drops released weekly. Stay tuned.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span>Free shipping over £75</span>
              <span>•</span>
              <span>14-day returns</span>
              <span>•</span>
              <span>Authentic guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {showQRScanner && (
        <QRScanner
          onScan={(result) => {
            console.log('QR Scan result:', result)
            // Handle QR scan result - could add items to cart, unlock discounts, etc.
          }}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  );
}