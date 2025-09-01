import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — HOTMESS",
  description: "For the ones still here. HOTMESS is a queer engine: clothing, radio, aftercare.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-heading font-bold mb-12 text-center text-hotpink">
            For the ones still here.
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-gray-300 mb-8 text-center">
              HOTMESS is a queer engine: clothing, radio, aftercare. RAW CONVICT RECORDS in your bones, 
              Stewart Who in your ear, Nick Denton on the decks, and HNHMESS in your gym bag. 
              We sell the night—but we walk you home.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6 text-hung">
                  What We Do
                </h2>
                <ul className="space-y-4 text-gray-300">
                  <li>• CMS-powered lookbook with parallax, scroll, overlays</li>
                  <li>• Animated dropdowns and overlays with Radix UI + Framer Motion</li>
                  <li>• Shop with instant search and Shopify integration</li>
                  <li>• Admin/editor UI for content management</li>
                  <li>• Affiliate dashboard with QR codes, stats, and payouts</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-heading font-bold mb-6 text-hotpink">
                  Our Mission
                </h2>
                <p className="text-gray-300">
                  For the boys who stayed up, stayed soft, and still showed up. 
                  HOTMESS creates spaces where queer expression meets cutting-edge technology, 
                  where aftercare isn't an afterthought but the foundation of everything we build.
                </p>
              </div>
            </div>

            <div className="text-center mt-16 p-8 bg-gray-900 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-heading font-bold mb-4 text-hung">
                Join the Community
              </h3>
              <p className="text-gray-300 mb-6">
                Connect with like-minded individuals in our inclusive space.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="btn-primary">Join Discord</button>
                <button className="btn-secondary">Follow on Social</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}