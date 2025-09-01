import type { Metadata } from "next";

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
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-xl font-heading font-bold mb-4 text-hotpink">
                Tap /claim in Telegram
              </h3>
              <p className="text-gray-400">
                Connect with our bot and get your unique affiliate link instantly.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-xl font-heading font-bold mb-4 text-hung">
                Share your link/QR
              </h3>
              <p className="text-gray-400">
                Post on social, share with friends, or display your QR code anywhere.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-xl font-heading font-bold mb-4 text-hotpink">
                Get paid monthly
              </h3>
              <p className="text-gray-400">
                Earn commission on every sale through your link. Direct payouts, no delays.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 mb-12">
            <h2 className="text-3xl font-heading font-bold mb-6 text-hung">
              Scan. Grrr. Repeat.
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Your link, your cut, your crown.
            </p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-4">
                  <div className="text-black font-bold">QR CODE</div>
                </div>
                <p className="text-sm text-gray-400">Your unique QR code</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400 mb-2">Commission Rate:</p>
                <p className="text-3xl font-bold text-hung">15%</p>
                <p className="text-sm text-gray-400 mt-4">Minimum Payout:</p>
                <p className="text-xl font-semibold text-hotpink">£25</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="btn-primary">
              Start Earning
            </button>
            <button className="btn-secondary">
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}