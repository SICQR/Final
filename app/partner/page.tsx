import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Partner Dashboard — HOTMESS",
  description: "Partner portal for managing collaborations and tracking performance.",
};

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-hung">
              Partner Dashboard
            </h1>
            <p className="text-gray-300">
              Manage your partnership with HOTMESS and track collaborative success
            </p>
          </div>

          {/* Partner Info Header */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold">RAW CONVICT RECORDS</h2>
                  <p className="text-gray-400">Music Partner • Active since Aug 2023</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="bg-green-600 text-white px-2 py-1 text-xs rounded">ACTIVE</span>
                    <span className="bg-hotpink text-black px-2 py-1 text-xs rounded font-bold">FEATURED</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-hung">£12,450</div>
                <div className="text-sm text-gray-400">Total Revenue Share</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Dashboard */}
            <div className="lg:col-span-2 space-y-8">
              {/* Performance Metrics */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-2xl font-heading font-bold mb-6 text-hotpink">Performance Overview</h3>
                
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-hung">156</div>
                    <div className="text-sm text-gray-400">Referrals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-hotpink">89%</div>
                    <div className="text-sm text-gray-400">Conversion Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-hung">23</div>
                    <div className="text-sm text-gray-400">Collaborations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-hotpink">4.8</div>
                    <div className="text-sm text-gray-400">Rating</div>
                  </div>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="bg-gray-800 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <p className="text-gray-400">Performance Chart</p>
                    <p className="text-sm text-gray-500">Revenue & engagement over time</p>
                  </div>
                </div>
              </div>

              {/* Active Collaborations */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-2xl font-heading font-bold mb-6 text-hung">Active Collaborations</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">Friday Night Frequency Music</h4>
                        <p className="text-gray-400 text-sm">Exclusive tracks for weekly radio show</p>
                      </div>
                      <span className="bg-green-600 text-white px-2 py-1 text-xs rounded">ACTIVE</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Duration:</span>
                        <div>6 months</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Revenue Share:</span>
                        <div className="text-hung font-semibold">£2,100/month</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Next Review:</span>
                        <div>March 15, 2024</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">Event Soundtrack Licensing</h4>
                        <p className="text-gray-400 text-sm">Music licensing for HOTMESS events</p>
                      </div>
                      <span className="bg-yellow-600 text-black px-2 py-1 text-xs rounded">PENDING</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Duration:</span>
                        <div>Per event</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Rate:</span>
                        <div className="text-hung font-semibold">£500/event</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <div>Contract review</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">Artist Spotlight Series</h4>
                        <p className="text-gray-400 text-sm">Monthly artist features on radio and social</p>
                      </div>
                      <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">PROPOSED</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Duration:</span>
                        <div>12 months</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Investment:</span>
                        <div className="text-hung font-semibold">£800/month</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Decision:</span>
                        <div>Feb 28, 2024</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-2xl font-heading font-bold mb-6 text-hotpink">Recent Activity</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">🎵</span>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">New track featured</span> on Friday Night Frequency
                      </p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">💰</span>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">Revenue share payment</span> processed (£2,100)
                      </p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">📊</span>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">Monthly report</span> generated
                      </p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-lg">🎯</span>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">Collaboration milestone</span> reached (20 tracks)
                      </p>
                      <p className="text-xs text-gray-400">1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-hung">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-sm py-2">
                    Submit New Content
                  </button>
                  <button className="w-full btn-secondary text-sm py-2">
                    Request Payment
                  </button>
                  <button className="w-full py-2 border border-gray-600 rounded-lg hover:border-gray-400 transition-colors text-sm">
                    Download Report
                  </button>
                  <button className="w-full py-2 border border-gray-600 rounded-lg hover:border-gray-400 transition-colors text-sm">
                    Contact Support
                  </button>
                </div>
              </div>

              {/* Partnership Health */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-hotpink">Partnership Health</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Content Quality</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '94%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Delivery Time</span>
                      <span className="text-green-400">Great</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Communication</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '96%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Payment */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-hung">Next Payment</h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hotpink mb-2">£2,100</div>
                  <div className="text-sm text-gray-400 mb-4">Due in 12 days</div>
                  <div className="text-xs text-gray-500">
                    Payment Date: Feb 1, 2024
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-hotpink">Partner Resources</h3>
                <div className="space-y-2 text-sm">
                  <Link href="#" className="block text-hotpink hover:text-hotpink/80">
                    Brand Guidelines
                  </Link>
                  <Link href="#" className="block text-hung hover:text-hung/80">
                    Content Templates
                  </Link>
                  <Link href="#" className="block text-hotpink hover:text-hotpink/80">
                    Marketing Assets
                  </Link>
                  <Link href="#" className="block text-hung hover:text-hung/80">
                    Partnership Agreement
                  </Link>
                  <Link href="#" className="block text-hotpink hover:text-hotpink/80">
                    Support Portal
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
            <p className="text-yellow-200 text-sm text-center">
              <strong>Demo Notice:</strong> This is a demo partner dashboard. Real partnership data and functionality are not yet implemented.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}