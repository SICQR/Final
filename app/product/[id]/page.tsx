import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  sizes: string[];
  colors: string[];
  materials: string;
  care: string;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      // In production, use full URL or relative path
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  if (!product) {
    return {
      title: "Product Not Found — HOTMESS",
      description: "The product you're looking for could not be found."
    };
  }

  return {
    title: `${product.name} — HOTMESS`,
    description: product.description,
    openGraph: {
      title: `${product.name} — HOTMESS`,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-hotpink">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-hotpink">Shop</Link>
              <span>/</span>
              <span className="text-white">{product.name}</span>
            </div>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📸</div>
                  <p className="text-gray-400">Product Image</p>
                  <p className="text-sm text-gray-500">{product.images[0]}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Img {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="text-sm text-hung font-semibold mb-2">{product.category}</div>
                <h1 className="text-4xl font-heading font-bold mb-4">{product.name}</h1>
                <p className="text-xl text-gray-300 mb-6">{product.description}</p>
                <div className="text-3xl font-bold text-hotpink">£{product.price}</div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hotpink transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hung transition-colors"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                {product.inStock ? (
                  <button className="btn-primary w-full text-lg py-4">
                    Add to Cart
                  </button>
                ) : (
                  <button className="btn-secondary w-full text-lg py-4" disabled>
                    Out of Stock
                  </button>
                )}
                <button className="w-full py-3 border border-gray-600 rounded-lg hover:border-gray-400 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              {/* Product Details */}
              <div className="border-t border-gray-800 pt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{product.longDescription}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Materials</h3>
                  <p className="text-gray-300">{product.materials}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Care Instructions</h3>
                  <p className="text-gray-300">{product.care}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">More from {product.category}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <Link
                  key={item}
                  href={`/product/${item + 10}`}
                  className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-hotpink transition-colors"
                >
                  <div className="aspect-square bg-gray-800 flex items-center justify-center">
                    <p className="text-gray-600 font-heading text-xl">
                      RELATED {item}
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl mb-2">Related Item #{item}</h3>
                    <p className="text-gray-400 mb-4">Similar style piece</p>
                    <div className="flex justify-between items-center">
                      <span className="text-hung font-bold text-xl">£{45 + item * 15}</span>
                      <span className="text-sm text-gray-400">View Details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}