import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Profile — HOTMESS",
  description: "Manage your HOTMESS profile, preferences, and community activity.",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-hotpink">
              Your Profile
            </h1>
            <p className="text-gray-300">
              Manage your account settings and community activity
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 sticky top-8">
                {/* Profile Picture */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto flex items-center justify-center mb-4">
                    <span className="text-3xl">👤</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">MessyQueen2024</h3>
                  <p className="text-gray-400 text-sm">Member since Jan 2024</p>
                  <button className="btn-secondary mt-4 text-sm">
                    Change Avatar
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Community Posts</span>
                    <span className="text-hotpink font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Events Attended</span>
                    <span className="text-hung font-semibold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Affiliate Earnings</span>
                    <span className="text-hotpink font-semibold">£127.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Member Level</span>
                    <span className="text-hung font-semibold">RAW</span>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  <button className="w-full text-left py-2 px-4 rounded-lg bg-hotpink text-black font-semibold">
                    Profile Settings
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                    Community Activity
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                    Affiliate Dashboard
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                    Event History
                  </button>
                  <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                    Privacy Settings
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Information */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-heading font-bold mb-6 text-hotpink">
                  Profile Information
                </h2>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="displayName"
                        defaultValue="MessyQueen2024"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-hotpink focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue="messy@example.com"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-hotpink focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      placeholder="Tell the community about yourself..."
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-hotpink focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        placeholder="London, UK"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-hotpink focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pronouns" className="block text-sm font-medium mb-2">
                        Pronouns
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-hotpink focus:outline-none transition-colors">
                        <option>Select pronouns</option>
                        <option>she/her</option>
                        <option>he/him</option>
                        <option>they/them</option>
                        <option>other</option>
                      </select>
                    </div>
                  </div>

                  <button className="btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>

              {/* Privacy Settings */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-heading font-bold mb-6 text-hung">
                  Privacy & Notifications
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="visibility"
                          className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 focus:ring-hotpink focus:ring-2"
                          defaultChecked
                        />
                        <span className="ml-3">Public - visible to all community members</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="visibility"
                          className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 focus:ring-hotpink focus:ring-2"
                        />
                        <span className="ml-3">Friends only - visible to connections</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="visibility"
                          className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 focus:ring-hotpink focus:ring-2"
                        />
                        <span className="ml-3">Private - only visible to you</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 rounded focus:ring-hotpink focus:ring-2"
                          defaultChecked
                        />
                        <span className="ml-3">Event announcements and updates</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 rounded focus:ring-hotpink focus:ring-2"
                          defaultChecked
                        />
                        <span className="ml-3">New product drops and releases</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 rounded focus:ring-hotpink focus:ring-2"
                        />
                        <span className="ml-3">Community posts and mentions</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 rounded focus:ring-hotpink focus:ring-2"
                        />
                        <span className="ml-3">Affiliate program updates</span>
                      </label>
                    </div>
                  </div>

                  <button className="btn-secondary">
                    Save Privacy Settings
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-heading font-bold mb-6 text-hotpink">
                  Recent Activity
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg">
                    <span className="text-lg">💬</span>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">You posted</span> in the community forum
                      </p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg">
                    <span className="text-lg">🎫</span>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">You booked tickets</span> for Friday Night Frequency
                      </p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg">
                    <span className="text-lg">🛍️</span>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">You viewed</span> HOTMESS Drop #3
                      </p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>
                </div>
                
                <button className="btn-secondary mt-6 w-full">
                  View All Activity
                </button>
              </div>

              {/* Demo Notice */}
              <div className="p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                <p className="text-yellow-200 text-sm text-center">
                  <strong>Demo Notice:</strong> This is a demo profile page. Data saving and user authentication are not yet functional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}