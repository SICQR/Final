"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Card, LoadingSpinner } from '@/components/ui';
import { Product } from '@/types';

const MOCK_PRODUCTS: Product[] = [
  {
    _id: '1',
    title: 'HOTMESS Tee - RAW',
    slug: { current: 'hotmess-tee-raw' },
    price: 35,
    description: 'Limited edition RAW collection. Organic cotton with bold HOTMESS branding.',
    category: 'raw',
    inStock: true
  },
  {
    _id: '2',
    title: 'HUNG Chain - Gold',
    slug: { current: 'hung-chain-gold' },
    price: 85,
    description: 'Statement chain in 18k gold plating. Wear your status.',
    category: 'hung',
    inStock: true
  },
  {
    _id: '3',
    title: 'HIGH Frequency Hoodie',
    slug: { current: 'high-frequency-hoodie' },
    price: 120,
    description: 'Premium heavyweight hoodie with embroidered radio waves.',
    category: 'high',
    inStock: false
  },
  {
    _id: '4',
    title: 'SUPER Mesh Tank',
    slug: { current: 'super-mesh-tank' },
    price: 45,
    description: 'Breathable mesh tank for the dance floor. Sweat-wicking technology.',
    category: 'super',
    inStock: true
  },
  {
    _id: '5',
    title: 'RAW Convict Cap',
    slug: { current: 'raw-convict-cap' },
    price: 28,
    description: 'Structured cap with RAW CONVICT RECORDS embroidery.',
    category: 'raw',
    inStock: true
  },
  {
    _id: '6',
    title: 'FILTH FREQUENCY Vinyl',
    slug: { current: 'filth-frequency-vinyl' },
    price: 65,
    description: 'Limited press compilation album. Underground sounds on wax.',
    category: 'high',
    inStock: true
  }
];

const CATEGORY_COLORS = {
  raw: 'text-red-400 border-red-400',
  hung: 'text-hung border-hung',
  high: 'text-purple-400 border-purple-400',
  super: 'text-hotpink border-hotpink'
};

export const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'raw', 'hung', 'high', 'super'];

  useEffect(() => {
    // In a real implementation, fetch from Sanity when environment is configured
    // if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    //   fetchProductsFromSanity();
    // }
  }, []);

  const fetchProductsFromSanity = async () => {
    setLoading(true);
    try {
      // Only attempt to fetch if Sanity is configured
      if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        const { sanityClient, queries } = await import('@/lib/sanity');
        const sanityProducts = await sanityClient.fetch(queries.products);
        if (sanityProducts && sanityProducts.length > 0) {
          setProducts(sanityProducts);
        }
      }
    } catch (error) {
      console.error('Failed to fetch products from Sanity:', error);
      // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="uppercase tracking-wider"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Card key={product._id} variant="dark" className="group hover:scale-105 transition-transform overflow-hidden p-0">
            <div className="aspect-square bg-gray-800 flex items-center justify-center relative overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image.asset._ref}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="text-gray-600 font-heading text-xl text-center">
                  {product.title.split(' ').slice(0, 2).join('\n')}
                </div>
              )}
              
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-red-400 font-heading font-bold text-lg">SOLD OUT</span>
                </div>
              )}
              
              <div className={`absolute top-4 right-4 px-2 py-1 border rounded-full text-xs font-bold uppercase ${CATEGORY_COLORS[product.category]}`}>
                {product.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-heading text-xl mb-2 group-hover:text-hotpink transition-colors">
                {product.title}
              </h3>
              {product.description && (
                <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-hung font-bold text-xl">£{product.price}</span>
                <Button
                  size="sm"
                  variant={product.inStock ? 'primary' : 'ghost'}
                  disabled={!product.inStock}
                  className="min-w-[100px]"
                >
                  {product.inStock ? 'Add to Cart' : 'Sold Out'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No products found in this category.</p>
        </div>
      )}

      {/* Connect Shopify CTA */}
      <Card variant="gradient" className="mt-16 text-center">
        <h3 className="text-2xl font-heading font-bold mb-4">Connect Your Store</h3>
        <p className="text-gray-300 mb-6">
          Integrate with Shopify or add products through Sanity CMS to show real inventory and enable purchases.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary">
            Configure Shopify
          </Button>
          <Button variant="secondary">
            Add Products in CMS
          </Button>
        </div>
      </Card>
    </div>
  );
};