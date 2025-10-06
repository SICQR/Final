import Link from "next/link";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { Button, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "HOTMESS London — The Filth Frequency",
  description: "Queer engine. Streamed. Scanned. Worn. Shop limited drops, stream HOTMESS RADIO, and earn with every scan.",
};

export default function HomePage() {
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
            <Link href="/radio">
              <Button variant="primary" size="lg">
                Listen Live
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="secondary" size="lg">
                Shop Drops
              </Button>
            </Link>
            <Link href="/affiliate">
              <Button variant="primary" size="lg">
                Join the Room
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Radio */}
            <Card variant="dark" className="text-center">
              <h3 className="text-2xl font-heading font-bold mb-4 text-hotpink">
                HOTMESS RADIO
              </h3>
              <p className="text-gray-300 mb-6">
                London&apos;s Filth Frequency. Live now.
              </p>
              <p className="text-sm italic text-hung">
                &ldquo;Press play, lover. We&apos;ll do the rest.&rdquo;
              </p>
            </Card>

            {/* Drops */}
            <Card variant="dark" className="text-center">
              <h3 className="text-2xl font-heading font-bold mb-4 text-hung">
                Drops
              </h3>
              <p className="text-gray-300 mb-6">
                RAW / HUNG / HIGH / SUPER — limited, loud, lethal.
              </p>
              <p className="text-sm italic text-hotpink">
                &ldquo;Wear the mess. Own the night.&rdquo;
              </p>
            </Card>

            {/* Aftercare */}
            <Card variant="dark" className="text-center">
              <h3 className="text-2xl font-heading font-bold mb-4 text-hotpink">
                Aftercare (HNHMESS)
              </h3>
              <p className="text-gray-300 mb-6">
                HAND &apos;N&apos; HAND IS THE ONLY WAY TO LAND.
              </p>
              <p className="text-sm italic text-hung">
                &ldquo;Hydrate, breathe, check in.&rdquo;
              </p>
            </Card>
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