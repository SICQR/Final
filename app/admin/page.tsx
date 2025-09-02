import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — HOTMESS",
  description: "Content management and admin tools for HOTMESS platform.",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-heading font-bold mb-12 text-center text-hotpink">
            Admin Dashboard
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-heading font-bold mb-4 text-hung">
                Content Management
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li>• Edit homepage sections</li>
                <li>• Manage product catalog</li>
                <li>• Update radio schedule</li>
                <li>• Configure affiliate settings</li>
              </ul>
              <button className="btn-primary mt-6 w-full">
                Open Sanity Studio
              </button>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-heading font-bold mb-4 text-hotpink">
                Analytics
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li>• Website traffic</li>
                <li>• Sales performance</li>
                <li>• Radio listener stats</li>
                <li>• Affiliate commissions</li>
              </ul>
              <button className="btn-secondary mt-6 w-full">
                View Reports
              </button>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-900 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-heading font-bold mb-4 text-center text-hung">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="btn-primary">Add Product</button>
              <button className="btn-secondary">Schedule Show</button>
              <button className="btn-primary">Send Newsletter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}