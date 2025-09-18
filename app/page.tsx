import Link from "next/link";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HOTMESS London — The Filth Frequency",
  description: "Queer engine. Streamed. Scanned. Worn. Shop limited drops, stream HOTMESS RADIO, and earn with every scan.",
  openGraph: {
    title: "HOTMESS London — The Filth Frequency",
    description: "Queer engine. Streamed. Scanned. Worn. Shop limited drops, stream HOTMESS RADIO, and earn with every scan.",
    type: "website",
  },
};

// Helper function to get featured content
async function getFeaturedContent() {
  try {
    // In production, these would be real API calls
    // For now, return mock data that represents what the APIs would return
    return {
      weather: {
        temperature: 8,
        condition: "Partly Cloudy",
        vibe: "Perfect weather for a HOTMESS night out - grab a jacket for aftercare! 🧥"
      },
      nextEvent: {
        id: 1,
        title: "Friday Night Frequency",
        date: "2024-01-26T22:00:00Z",
        location: "Underground Club, Shoreditch"
      },
      featuredProducts: [
        { id: 1, name: "RAW Tee", price: 60, category: "RAW" },
        { id: 5, name: "HNHMESS Comfort", price: 70, category: "HNHMESS" },
        { id: 3, name: "HIGH Energy Tank", price: 45, category: "HIGH" }
      ]
    };
  } catch (error) {
    console.error('Failed to fetch featured content:', error);
    return null;
  }
}

export default async function HomePage() {
  const featuredContent = await getFeaturedContent();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <p className="text-hotpink font-semibold mb-2">Queer engine. Streamed. Scanned. Worn.</p>
            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6 text-balance">
              Always too much, <span className="text-hotpink">never enough.</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 text-balance">
            Shop limited drops, stream HOTMESS RADIO, and earn with every scan. 
            For the boys who stayed up, stayed soft, and still showed up. 
            HNHMESS: aftercare, not afterthought.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link href="/radio" className="btn-primary">
              Listen Live
            </Link>
            <Link href="/shop" className="btn-secondary">
              Shop Drops
            </Link>
            <Link href="/events" className="btn-primary">
              View Events
            </Link>
            <Link href="/affiliate" className="btn-secondary">
              Join the Room
            </Link>
          </div>

          {/* Weather Widget */}
          {featuredContent?.weather && (
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">{featuredContent.weather.temperature}°C</span>
                  <span className="text-gray-400 ml-2">{featuredContent.weather.condition}</span>
                </div>
                <span className="text-2xl">🌤️</span>
              </div>
              <p className="text-sm text-hotpink italic mt-2">{featuredContent.weather.vibe}</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Radio */}
            <Link href="/radio" className="text-center p-8 border border-gray-800 rounded-lg hover:border-hotpink transition-colors group">
              <h3 className="text-2xl font-heading font-bold mb-4 text-hotpink group-hover:text-hotpink/80">
                HOTMESS RADIO
              </h3>
              <p className="text-gray-300 mb-6">
                London&apos;s Filth Frequency. Live now.
              </p>
              <p className="text-sm italic text-hung">
                &ldquo;Press play, lover. We&apos;ll do the rest.&rdquo;
              </p>
            </Link>

            {/* Drops */}
            <Link href="/shop" className="text-center p-8 border border-gray-800 rounded-lg hover:border-hung transition-colors group">
              <h3 className="text-2xl font-heading font-bold mb-4 text-hung group-hover:text-hung/80">
                Drops
              </h3>
              <p className="text-gray-300 mb-6">
                RAW / HUNG / HIGH / SUPER — limited, loud, lethal.
              </p>
              <p className="text-sm italic text-hotpink">
                &ldquo;Wear the mess. Own the night.&rdquo;
              </p>
            </Link>

            {/* Aftercare */}
            <Link href="/community" className="text-center p-8 border border-gray-800 rounded-lg hover:border-hotpink transition-colors group">
              <h3 className="text-2xl font-heading font-bold mb-4 text-hotpink group-hover:text-hotpink/80">
                Aftercare (HNHMESS)
              </h3>
              <p className="text-gray-300 mb-6">
                HAND &apos;N&apos; HAND IS THE ONLY WAY TO LAND.
              </p>
              <p className="text-sm italic text-hung">
                &ldquo;Hydrate, breathe, check in.&rdquo;
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredContent?.featuredProducts && (
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-hung">
                Featured Drops
              </h2>
              <p className="text-gray-300">Limited pieces, endless possibilities</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {featuredContent.featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-hotpink transition-colors group"
                >
                  <div className="aspect-square bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📸</div>
                      <p className="text-gray-500 text-sm">{product.category}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg mb-2 group-hover:text-hotpink transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-hung font-bold">£{product.price}</span>
                      <span className="text-sm text-gray-400 group-hover:text-hung transition-colors">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/shop" className="btn-primary px-8 py-3">
                Shop All Drops
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Next Event */}
      {featuredContent?.nextEvent && (
        <section className="py-20 px-4 bg-gray-900">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 text-hotpink">
              Next Event
            </h2>
            
            <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-heading font-bold mb-4">{featuredContent.nextEvent.title}</h3>
              <p className="text-gray-300 mb-4">{featuredContent.nextEvent.location}</p>
              <p className="text-hung font-semibold mb-6">
                {new Date(featuredContent.nextEvent.date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div className="flex justify-center space-x-4">
                <Link href={`/event/${featuredContent.nextEvent.id}`} className="btn-primary">
                  Get Tickets
                </Link>
                <Link href="/events" className="btn-secondary">
                  All Events
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Community Call-to-Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 text-hung">
            Join the Community
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Connect with others who get it. Share stories, find support, and celebrate together.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/community" className="btn-primary px-8 py-3">
              Join Community
            </Link>
            <Link href="/register" className="btn-secondary px-8 py-3">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}