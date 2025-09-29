'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'affiliate' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  provider: 'google' | 'facebook' | 'telegram';
  joinDate: Date;
  lastActive: Date;
  totalOrders: number;
  totalSpent: number;
  affiliateCode?: string;
  affiliateEarnings?: number;
}

interface PayoutRequest {
  id: string;
  affiliateCode: string;
  affiliateName: string;
  amount: number;
  requestDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  paymentMethod: string;
  notes?: string;
}

interface SystemConfig {
  siteName: string;
  adminEmail: string;
  supportEmail: string;
  features: {
    ageGate: boolean;
    pushNotifications: boolean;
    affiliateProgram: boolean;
    radioScheduling: boolean;
    analytics: boolean;
  };
  payments: {
    currency: string;
    taxRate: number;
    minimumPayout: number;
    payoutFrequency: 'weekly' | 'monthly';
  };
  integrations: {
    shopify: boolean;
    salesforce: boolean;
    googleSheets: boolean;
    makecom: boolean;
    telegram: boolean;
  };
}

export default function AdminPanelEnhanced() {
  const [activeTab, setActiveTab] = useState<'users' | 'payouts' | 'config' | 'analytics'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [payouts, setPayouts] = useState<PayoutRequest[]>([]);
  const [config, setConfig] = useState<SystemConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      // Load all admin data
      const [usersRes, payoutsRes, configRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/payouts'),
        fetch('/api/admin/config'),
      ]);

      const [usersData, payoutsData, configData] = await Promise.all([
        usersRes.json(),
        payoutsRes.json(),
        configRes.json(),
      ]);

      setUsers(usersData);
      setPayouts(payoutsData);
      setConfig(configData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayoutAction = async (payoutId: string, action: 'approve' | 'reject', notes?: string) => {
    try {
      const response = await fetch(`/api/admin/payouts/${payoutId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, notes }),
      });

      if (response.ok) {
        // Refresh payouts
        const updatedPayouts = payouts.map(p => 
          p.id === payoutId 
            ? { 
                ...p, 
                status: (action === 'approve' ? 'approved' : 'rejected') as PayoutRequest['status'], 
                notes 
              }
            : p
        );
        setPayouts(updatedPayouts);
      }
    } catch (error) {
      console.error('Failed to update payout:', error);
    }
  };

  const handleUserAction = async (userId: string, action: 'suspend' | 'activate' | 'promote' | 'demote') => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        // Refresh users
        await loadAdminData();
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const updateConfig = async (updates: Partial<SystemConfig>) => {
    try {
      const response = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setConfig(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (error) {
      console.error('Failed to update config:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl font-heading">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-6xl font-heading font-bold text-hotpink mb-4">Admin Panel</h1>
          <p className="text-gray-400">Manage users, payouts, and system configuration</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 border-b border-gray-800">
          {(['users', 'payouts', 'config', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-hotpink border-hotpink'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'users' && (
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-hung">User Management</h2>
              
              {/* Users Table */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold">User</th>
                        <th className="text-left py-4 px-6 font-semibold">Role</th>
                        <th className="text-left py-4 px-6 font-semibold">Status</th>
                        <th className="text-left py-4 px-6 font-semibold">Orders</th>
                        <th className="text-left py-4 px-6 font-semibold">Total Spent</th>
                        <th className="text-left py-4 px-6 font-semibold">Affiliate</th>
                        <th className="text-left py-4 px-6 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800">
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-semibold">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                              <div className="text-xs text-gray-500">{user.provider}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === 'admin' ? 'bg-red-600 text-white' :
                              user.role === 'affiliate' ? 'bg-green-600 text-white' :
                              'bg-gray-600 text-white'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === 'active' ? 'bg-green-600 text-white' :
                              user.status === 'suspended' ? 'bg-red-600 text-white' :
                              'bg-yellow-600 text-white'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">{user.totalOrders}</td>
                          <td className="py-4 px-6 text-green-400">£{user.totalSpent.toFixed(2)}</td>
                          <td className="py-4 px-6">
                            {user.affiliateCode ? (
                              <div>
                                <div className="font-semibold text-hotpink">{user.affiliateCode}</div>
                                <div className="text-sm text-gray-400">
                                  £{user.affiliateEarnings?.toFixed(2) || '0.00'}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-2">
                              {user.status === 'active' ? (
                                <button
                                  onClick={() => handleUserAction(user.id, 'suspend')}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                                >
                                  Suspend
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUserAction(user.id, 'activate')}
                                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                                >
                                  Activate
                                </button>
                              )}
                              {user.role !== 'admin' && (
                                <button
                                  onClick={() => handleUserAction(user.id, 'promote')}
                                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                                >
                                  Promote
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payouts' && (
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-hung">Payout Requests</h2>
              
              <div className="grid gap-6">
                {payouts.map((payout) => (
                  <div key={payout.id} className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-hotpink">{payout.affiliateName}</h3>
                        <p className="text-gray-400">Code: {payout.affiliateCode}</p>
                        <p className="text-sm text-gray-500">
                          Requested: {payout.requestDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-400">£{payout.amount.toFixed(2)}</div>
                        <div className="text-sm text-gray-400">{payout.paymentMethod}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        payout.status === 'pending' ? 'bg-yellow-600 text-white' :
                        payout.status === 'approved' ? 'bg-green-600 text-white' :
                        payout.status === 'rejected' ? 'bg-red-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {payout.status}
                      </span>

                      {payout.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handlePayoutAction(payout.id, 'approve')}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              const notes = prompt('Rejection reason:');
                              if (notes) handlePayoutAction(payout.id, 'reject', notes);
                            }}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>

                    {payout.notes && (
                      <div className="mt-4 p-3 bg-gray-800 rounded">
                        <p className="text-sm text-gray-300">{payout.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'config' && config && (
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-hung">System Configuration</h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Site Settings */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                  <h3 className="text-xl font-semibold mb-4 text-hotpink">Site Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Site Name</label>
                      <input
                        type="text"
                        value={config.siteName}
                        onChange={(e) => updateConfig({ siteName: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Admin Email</label>
                      <input
                        type="email"
                        value={config.adminEmail}
                        onChange={(e) => updateConfig({ adminEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Support Email</label>
                      <input
                        type="email"
                        value={config.supportEmail}
                        onChange={(e) => updateConfig({ supportEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                  <h3 className="text-xl font-semibold mb-4 text-hotpink">Features</h3>
                  
                  <div className="space-y-3">
                    {Object.entries(config.features).map(([feature, enabled]) => (
                      <div key={feature} className="flex items-center justify-between">
                        <span className="capitalize">{feature.replace(/([A-Z])/g, ' $1')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => updateConfig({
                              features: { ...config.features, [feature]: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-hotpink peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Settings */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                  <h3 className="text-xl font-semibold mb-4 text-hotpink">Payment Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Currency</label>
                      <select
                        value={config.payments.currency}
                        onChange={(e) => updateConfig({
                          payments: { ...config.payments, currency: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                      >
                        <option value="GBP">GBP</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={config.payments.taxRate}
                        onChange={(e) => updateConfig({
                          payments: { ...config.payments, taxRate: parseFloat(e.target.value) }
                        })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Minimum Payout (£)</label>
                      <input
                        type="number"
                        value={config.payments.minimumPayout}
                        onChange={(e) => updateConfig({
                          payments: { ...config.payments, minimumPayout: parseInt(e.target.value) }
                        })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Payout Frequency</label>
                      <select
                        value={config.payments.payoutFrequency}
                        onChange={(e) => updateConfig({
                          payments: { ...config.payments, payoutFrequency: e.target.value as 'weekly' | 'monthly' }
                        })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Integrations */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                  <h3 className="text-xl font-semibold mb-4 text-hotpink">Integrations</h3>
                  
                  <div className="space-y-3">
                    {Object.entries(config.integrations).map(([integration, enabled]) => (
                      <div key={integration} className="flex items-center justify-between">
                        <span className="capitalize">{integration}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          enabled ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                        }`}>
                          {enabled ? 'Connected' : 'Disabled'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-hung">Analytics Overview</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Total Users
                  </h3>
                  <p className="text-3xl font-bold text-hotpink">{users.length}</p>
                </div>
                
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Active Affiliates
                  </h3>
                  <p className="text-3xl font-bold text-green-400">
                    {users.filter(u => u.affiliateCode).length}
                  </p>
                </div>
                
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Pending Payouts
                  </h3>
                  <p className="text-3xl font-bold text-yellow-400">
                    {payouts.filter(p => p.status === 'pending').length}
                  </p>
                </div>
                
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Total Revenue
                  </h3>
                  <p className="text-3xl font-bold text-blue-400">
                    £{users.reduce((sum, user) => sum + user.totalSpent, 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <h3 className="text-xl font-semibold mb-4 text-hotpink">Quick Actions</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="btn-primary">Export User Data</button>
                  <button className="btn-secondary">Generate Report</button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    System Backup
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}