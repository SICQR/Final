'use client';

import { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  newLeads: number;
  convertedLeads: number;
  avgOrderValue: number;
  conversionRate: number;
  monthlyRevenue: number[];
  monthlyOrders: number[];
  topProducts: Array<{ name: string; sales: number; revenue: number }>;
  customerSegments: Array<{ segment: string; count: number; revenue: number }>;
  affiliatePerformance: Array<{ code: string; clicks: number; conversions: number; revenue: number }>;
}

export default function B2BDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/dashboard/metrics?range=${timeRange}`);
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center h-64">
            <div className="text-2xl font-heading">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold text-hotpink mb-4">B2B Dashboard</h1>
            <p className="text-gray-400">Failed to load dashboard data. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  // Chart configurations
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (£)',
        data: metrics.monthlyRevenue,
        borderColor: '#ff1981',
        backgroundColor: 'rgba(255, 25, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const ordersChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Orders',
        data: metrics.monthlyOrders,
        backgroundColor: '#ffba00',
        borderColor: '#ffba00',
        borderWidth: 1,
      },
    ],
  };

  const customerSegmentData = {
    labels: metrics.customerSegments.map(s => s.segment),
    datasets: [
      {
        data: metrics.customerSegments.map(s => s.count),
        backgroundColor: ['#ff1981', '#ffba00', '#00ff88', '#0088ff', '#8800ff'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
      },
      y: {
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#ffffff',
          padding: 20,
        },
      },
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-6xl font-heading font-bold text-hotpink">B2B Dashboard</h1>
          <div className="flex space-x-2">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  timeRange === range
                    ? 'bg-hotpink text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Total Revenue
            </h3>
            <p className="text-3xl font-bold text-hotpink">{formatCurrency(metrics.totalRevenue)}</p>
            <p className="text-sm text-gray-500 mt-1">Last {timeRange}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-hung">{metrics.totalOrders.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Last {timeRange}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Avg Order Value
            </h3>
            <p className="text-3xl font-bold text-green-400">{formatCurrency(metrics.avgOrderValue)}</p>
            <p className="text-sm text-gray-500 mt-1">Per order</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Conversion Rate
            </h3>
            <p className="text-3xl font-bold text-blue-400">{formatPercentage(metrics.conversionRate)}</p>
            <p className="text-sm text-gray-500 mt-1">Lead to customer</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-heading font-bold mb-6 text-hotpink">Revenue Trend</h3>
            <Line data={revenueChartData} options={chartOptions} />
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-heading font-bold mb-6 text-hung">Orders by Month</h3>
            <Bar data={ordersChartData} options={chartOptions} />
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-heading font-bold mb-6 text-hotpink">Customer Segments</h3>
            <Doughnut data={customerSegmentData} options={doughnutOptions} />
          </div>

          <div className="lg:col-span-2 bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-heading font-bold mb-6 text-hung">Top Products</h3>
            <div className="space-y-4">
              {metrics.topProducts.slice(0, 5).map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-hotpink rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="font-semibold">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">{formatCurrency(product.revenue)}</div>
                    <div className="text-sm text-gray-400">{product.sales} sales</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Affiliate Performance */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-12">
          <h3 className="text-xl font-heading font-bold mb-6 text-hotpink">Affiliate Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 font-semibold text-gray-400">Affiliate Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-400">Clicks</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-400">Conversions</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-400">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-400">Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                {metrics.affiliatePerformance.slice(0, 10).map((affiliate) => (
                  <tr key={affiliate.code} className="border-b border-gray-800 hover:bg-gray-800">
                    <td className="py-3 px-4 font-semibold text-hotpink">{affiliate.code}</td>
                    <td className="py-3 px-4">{affiliate.clicks.toLocaleString()}</td>
                    <td className="py-3 px-4">{affiliate.conversions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-green-400 font-semibold">
                      {formatCurrency(affiliate.revenue)}
                    </td>
                    <td className="py-3 px-4">
                      {affiliate.clicks > 0 ? formatPercentage((affiliate.conversions / affiliate.clicks) * 100) : '0%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-heading font-bold mb-4 text-hung">Lead Generation</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">New Leads</span>
                <span className="text-2xl font-bold text-blue-400">{metrics.newLeads}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Converted Leads</span>
                <span className="text-2xl font-bold text-green-400">{metrics.convertedLeads}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Conversion Rate</span>
                <span className="text-2xl font-bold text-hotpink">
                  {formatPercentage(metrics.conversionRate)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-heading font-bold mb-4 text-hotpink">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary">Export Report</button>
              <button className="w-full btn-secondary">Schedule Report</button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                View Detailed Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}