import type { Metadata } from "next";
import { Button, Card } from "@/components/ui";
import Link from "next/link";

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
            <Card variant="dark">
              <h2 className="text-2xl font-heading font-bold mb-4 text-hung">
                Content Management
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li>• Edit homepage sections</li>
                <li>• Manage product catalog</li>
                <li>• Update radio schedule</li>
                <li>• Configure affiliate settings</li>
              </ul>
              <Link href="/studio" target="_blank" className="block mt-6">
                <Button variant="primary" className="w-full">
                  Open Sanity Studio
                </Button>
              </Link>
            </Card>

            <Card variant="dark">
              <h2 className="text-2xl font-heading font-bold mb-4 text-hotpink">
                Analytics
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li>• Website traffic: Coming soon</li>
                <li>• Sales performance: Coming soon</li>
                <li>• Radio listener stats: Coming soon</li>
                <li>• Affiliate commissions: Coming soon</li>
              </ul>
              <Button variant="secondary" className="w-full mt-6" disabled>
                View Reports (Coming Soon)
              </Button>
            </Card>
          </div>

          <Card variant="dark" className="mt-12">
            <h2 className="text-2xl font-heading font-bold mb-4 text-center text-hung">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/studio" target="_blank">
                <Button variant="primary" className="w-full">Add Product</Button>
              </Link>
              <Button variant="secondary" className="w-full" disabled>
                Schedule Show (Coming Soon)
              </Button>
              <Button variant="ghost" className="w-full" disabled>
                Send Newsletter (Coming Soon)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}