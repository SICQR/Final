import type { Metadata } from "next";
import { AffiliateQR } from "@/components/AffiliateQR";
import { Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Earn with your mess — HOTMESS Affiliate",
  description: "Tap /claim in Telegram, share your link/QR, get paid monthly. No pyramid. Just scans and real cuts.",
};

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-heading font-bold mb-12 text-hung">
            Earn with your mess.
          </h1>
          
          <p className="text-xl text-gray-300 mb-16">
            No pyramid. Just scans and real cuts.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card variant="dark">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-xl font-heading font-bold mb-4 text-hotpink">
                Tap /claim in Telegram
              </h3>
              <p className="text-gray-400">
                Connect with our bot and get your unique affiliate link instantly.
              </p>
            </Card>

            <Card variant="dark">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-xl font-heading font-bold mb-4 text-hung">
                Share your link/QR
              </h3>
              <p className="text-gray-400">
                Post on social, share with friends, or display your QR code anywhere.
              </p>
            </Card>

            <Card variant="dark">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-xl font-heading font-bold mb-4 text-hotpink">
                Get paid monthly
              </h3>
              <p className="text-gray-400">
                Earn commission on every sale through your link. Direct payouts, no delays.
              </p>
            </Card>
          </div>

          <AffiliateQR />

          <div className="flex justify-center space-x-4">
            <a 
              href="https://t.me/hotmessldn_bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Start Earning
            </a>
            <button className="btn-secondary" disabled>
              View Dashboard (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}