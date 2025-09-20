'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import QRScanner from '@/components/QRScanner'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [scanHistory, setScanHistory] = useState([
    { id: 1, date: '2024-01-15', type: 'affiliate', reward: '£0.10', location: 'Camden Market' },
    { id: 2, date: '2024-01-14', type: 'ar_unlock', reward: 'AR Experience', location: 'Soho' },
    { id: 3, date: '2024-01-13', type: 'affiliate', reward: '£0.10', location: 'Shoreditch' },
  ])

  // Redirect if not authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-hotpink border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin')
  }

  const handleQRScan = (result: any) => {
    // Add new scan to history
    const newScan = {
      id: scanHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: result.type,
      reward: result.reward || result.message,
      location: 'Current Location'
    }
    setScanHistory([newScan, ...scanHistory])
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-heading font-bold mb-4 text-hotpink">
              Your Dashboard
            </h1>
            <p className="text-gray-400">
              Welcome back, {session?.user?.name || 'Scanner'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center">
              <h3 className="font-heading font-bold text-sm text-hotpink mb-2">
                Total Scans
              </h3>
              <p className="text-3xl font-bold">{session?.user?.totalScans || 247}</p>
              <p className="text-sm text-gray-400">+12 this week</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center">
              <h3 className="font-heading font-bold text-sm text-hung mb-2">
                Total Earnings
              </h3>
              <p className="text-3xl font-bold">£{session?.user?.totalEarnings || 24.70}</p>
              <p className="text-sm text-gray-400">+£1.20 this week</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center">
              <h3 className="font-heading font-bold text-sm text-hotpink mb-2">
                Rank
              </h3>
              <p className="text-3xl font-bold">#42</p>
              <p className="text-sm text-gray-400">of 1,247 scanners</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center">
              <h3 className="font-heading font-bold text-sm text-hung mb-2">
                Badges
              </h3>
              <p className="text-3xl font-bold">{session?.user?.badges?.length || 3}</p>
              <p className="text-sm text-gray-400">earned</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setShowQRScanner(true)}
              className="btn-primary"
            >
              📱 Scan QR Code
            </button>
            <button className="btn-secondary">
              🎯 View Challenges
            </button>
            <button className="btn-secondary">
              🏆 Leaderboard
            </button>
            <button className="btn-secondary">
              💸 Withdraw Earnings
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Scans */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-heading font-bold mb-6 text-hotpink">
                Recent Scans
              </h2>
              
              {scanHistory.length > 0 ? (
                <div className="space-y-4">
                  {scanHistory.slice(0, 5).map((scan) => (
                    <div key={scan.id} className="flex justify-between items-center p-4 bg-black rounded-lg border border-gray-800">
                      <div>
                        <p className="font-semibold">
                          {scan.type === 'affiliate' ? '💰' : scan.type === 'ar_unlock' ? '🎭' : '📦'} 
                          {' '}{scan.type.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-400">{scan.location}</p>
                        <p className="text-xs text-gray-500">{scan.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-hung font-bold">{scan.reward}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No scans yet</p>
                  <button
                    onClick={() => setShowQRScanner(true)}
                    className="btn-primary"
                  >
                    Start Scanning
                  </button>
                </div>
              )}
            </div>

            {/* Badges & Achievements */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-heading font-bold mb-6 text-hung">
                Badges & Achievements
              </h2>
              
              <div className="space-y-4">
                {['First Scan', 'Week Warrior', 'Social Scanner'].map((badge, index) => (
                  <div key={badge} className="flex items-center space-x-4 p-4 bg-black rounded-lg border border-gray-800">
                    <div className="text-2xl">
                      {index === 0 && '🎯'}
                      {index === 1 && '🔥'}
                      {index === 2 && '🌟'}
                    </div>
                    <div>
                      <p className="font-semibold">{badge}</p>
                      <p className="text-sm text-gray-400">
                        {index === 0 && 'Complete your first QR scan'}
                        {index === 1 && 'Scan 7 days in a row'}
                        {index === 2 && 'Share 5 scans on social'}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-green-400 text-sm">✓ Earned</span>
                    </div>
                  </div>
                ))}

                <div className="flex items-center space-x-4 p-4 bg-black rounded-lg border border-gray-800 opacity-50">
                  <div className="text-2xl">💎</div>
                  <div>
                    <p className="font-semibold">Century Club</p>
                    <p className="text-sm text-gray-400">Complete 100 scans</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-gray-500 text-sm">0/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Affiliate Stats */}
          <div className="mt-8 bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-heading font-bold mb-6 text-hotpink">
              Affiliate Program
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Your Referral Link</p>
                <div className="bg-black p-3 rounded border border-gray-800 text-sm font-mono">
                  hotmessldn.com/scan/{session?.user?.username || 'your_code'}
                </div>
                <button className="btn-secondary mt-3 text-sm">
                  📋 Copy Link
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">People Referred</p>
                <p className="text-3xl font-bold text-hung">12</p>
                <p className="text-sm text-gray-400">+2 this month</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Commission Earned</p>
                <p className="text-3xl font-bold text-hotpink">£18.60</p>
                <p className="text-sm text-gray-400">15% of sales</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showQRScanner && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  )
}