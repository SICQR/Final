import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Shop Drops — HOTMESS",
  description: "RAW / HUNG / HIGH / SUPER — limited, loud, lethal. Wear the mess. Own the night.",
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  featured: boolean;
}

async function getProducts(): Promise<Product[]> {
  try {
    // In development, we'll use a fallback since the API might not be running
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Fallback to mock data
    return [
      {
        id: 1,
        name: "HOTMESS Drop #1",
        description: "RAW limited edition tee",
        price: 60,
        image: "/placeholder-product.jpg",
        category: "RAW",
        inStock: true,
        featured: true
      },
      {
        id: 2,
        name: "HOTMESS Drop #2", 
        description: "HUNG hoodie collection",
        price: 80,
        image: "/placeholder-product.jpg",
        category: "HUNG",
        inStock: true,
        featured: false
      },
      {
        id: 3,
        name: "HOTMESS Drop #3",
        description: "HIGH energy tank",
        price: 45,
        image: "/placeholder-product.jpg", 
        category: "HIGH",
        inStock: false,
        featured: true
      },
      {
        id: 4,
        name: "HOTMESS Drop #4",
        description: "SUPER exclusive mesh",
        price: 95,
        image: "/placeholder-product.jpg",
        category: "SUPER", 
        inStock: true,
        featured: false
      },
      {
        id: 5,
        name: "HOTMESS Drop #5",
        description: "Aftercare comfort collection",
        price: 70,
        image: "/placeholder-product.jpg",
        category: "HNHMESS",
        inStock: true,
        featured: true
      },
      {
        id: 6,
        name: "HOTMESS Drop #6",
        description: "Limited frequency gear",
        price: 55,
        image: "/placeholder-product.jpg",
        category: "RADIO",
        inStock: true,
        featured: false
      }
    ];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 text-hung">
              Drops
            </h1>
            <p className="text-2xl text-gray-300 mb-4">
              RAW / HUNG / HIGH / SUPER — limited, loud, lethal.
            </p>
            <p className="text-lg text-hotpink italic">
              &ldquo;Wear the mess. Own the night.&rdquo;
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="btn-primary">All</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hotpink transition-colors">RAW</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hung transition-colors">HUNG</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hotpink transition-colors">HIGH</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hung transition-colors">SUPER</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hotpink transition-colors">HNHMESS</button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-hotpink transition-colors group"
              >
                <div className="aspect-square bg-gray-800 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-gray-600 font-heading text-lg">
                      {product.category}
                    </p>
                  </div>
                  {product.featured && (
                    <div className="absolute top-4 left-4 bg-hotpink text-black px-2 py-1 text-xs font-bold rounded">
                      FEATURED
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                      SOLD OUT
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl mb-2 group-hover:text-hotpink transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-hung font-bold text-xl">£{product.price}</span>
                    <span className="text-sm text-gray-400 group-hover:text-hung transition-colors">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400 mb-4">
              More drops coming soon. Follow us for updates.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-secondary">
                View All Products
              </button>
              <button className="btn-primary">
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}