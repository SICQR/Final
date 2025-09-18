'use client'

import { useState, useEffect } from 'react'
import { dropService, Drop } from '@/lib/supabase'
import Link from 'next/link'

export default function FeaturedDrops() {
  const [drops, setDrops] = useState<Drop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDrops = async () => {
      try {
        const data = await dropService.getAll()
        // Show only first 3 for featured section
        setDrops(data.slice(0, 3))
      } catch (error) {
        console.error('Error fetching drops:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDrops()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-hung">
            Featured Drops
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-square bg-gray-800 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-heading font-bold text-center mb-12 text-hung">
          Featured Drops
        </h2>
        
        {drops.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {drops.map((drop) => (
              <div key={drop.id} className="group cursor-pointer">
                <div className="aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  {drop.image_url ? (
                    <img 
                      src={drop.image_url} 
                      alt={drop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <span className="font-heading text-2xl">{drop.title}</span>
                    </div>
                  )}
                </div>
                <h3 className="font-heading text-xl mb-2 group-hover:text-hotpink transition-colors">
                  {drop.title}
                </h3>
                <p className="text-gray-400 mb-3">{drop.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-hung font-bold text-xl">£{drop.price}</span>
                  <span className={`text-sm px-2 py-1 rounded uppercase ${
                    drop.in_stock ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'
                  }`}>
                    {drop.in_stock ? 'In Stock' : 'Sold Out'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-400 mb-6">New drops coming soon...</p>
            <Link href="/shop" className="btn-secondary">
              Browse All Products
            </Link>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/shop" className="btn-primary">
            Shop All Drops
          </Link>
        </div>
      </div>
    </section>
  )
}