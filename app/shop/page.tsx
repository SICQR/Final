import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Drops — HOTMESS",
  description: "RAW / HUNG / HIGH / SUPER — limited, loud, lethal. Wear the mess. Own the night.",
};

export default function ShopPage() {
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
            <p className="text-lg text-hotpink italic">
              &ldquo;Wear the mess. Own the night.&rdquo;
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product placeholders */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-600 font-heading text-xl">
                    PRODUCT {item}
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl mb-2">HOTMESS Drop #{item}</h3>
                  <p className="text-gray-400 mb-4">Limited edition piece</p>
                  <div className="flex justify-between items-center">
                    <span className="text-hung font-bold text-xl">£{50 + item * 10}</span>
                    <button className="btn-primary text-sm py-2 px-4">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400 mb-4">
              Connect your Shopify store to show real products
            </p>
            <button className="btn-secondary">
              View All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}