import Link from "next/link";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "HOTMESS London — The Filth Frequency",
  description: "Queer engine. Streamed. Scanned. Worn. Shop limited drops, stream HOTMESS RADIO, and earn with every scan.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4" id="main-content">
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
            <Link href="/affiliate" className="btn-primary">
              Join the Room
            </Link>
          </div>

          {/* New Features Showcase */}
          <div className="max-w-2xl mx-auto mb-16 p-6 bg-gray-900 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-heading font-bold mb-4 text-hung">🎮 Enhanced Navigation</h2>
            <p className="text-gray-300 mb-4">
              Experience NES-style tab completion and keyboard shortcuts for lightning-fast navigation.
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-sm">
              <span className="kbd">Tab</span>
              <span className="text-gray-400">or</span>
              <span className="kbd">Ctrl + K</span>
              <span className="text-gray-400">for command palette</span>
              <span className="text-gray-400">•</span>
              <span className="kbd">?</span>
              <span className="text-gray-400">for shortcuts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Radio */}
            <div className="text-center p-8 border border-gray-800 rounded-lg">
              <h3 className="text-2xl font-heading font-bold mb-4 text-hotpink">
                HOTMESS RADIO
              </h3>
              <p className="text-gray-300 mb-6">
                London&apos;s Filth Frequency. Live now.
              </p>
              <p className="text-sm italic text-hung">
                &ldquo;Press play, lover. We&apos;ll do the rest.&rdquo;
              </p>
            </div>

            {/* Drops */}
            <div className="text-center p-8 border border-gray-800 rounded-lg">
              <h3 className="text-2xl font-heading font-bold mb-4 text-hung">
                Drops
              </h3>
              <p className="text-gray-300 mb-6">
                RAW / HUNG / HIGH / SUPER — limited, loud, lethal.
              </p>
              <p className="text-sm italic text-hotpink">
                &ldquo;Wear the mess. Own the night.&rdquo;
              </p>
            </div>

            {/* Aftercare */}
            <div className="text-center p-8 border border-gray-800 rounded-lg">
              <h3 className="text-2xl font-heading font-bold mb-4 text-hotpink">
                Aftercare (HNHMESS)
              </h3>
              <p className="text-gray-300 mb-6">
                Sunday recovery show. Gentle, real, necessary.
                HAND &apos;N&apos; HAND IS THE ONLY WAY TO LAND.
              </p>
              <p className="text-sm italic text-hung">
                &ldquo;Hydrate, breathe, check in.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">
            <span className="text-hotpink font-semibold">#HNHMESS</span> •{" "}
            <span className="text-hung font-semibold">#HOTMESSLDN</span> •{" "}
            <span className="text-hotpink font-semibold">#HUNG</span>
          </p>
          <p className="text-sm text-gray-500">
            HOTMESSLDN.COM
          </p>
        </div>
      </footer>
    </div>
  );
}