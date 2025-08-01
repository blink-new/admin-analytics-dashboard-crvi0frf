// Realistic mock data for the dashboard
export const salesData = [
  { month: 'Jan', revenue: 45231, orders: 234, users: 1234 },
  { month: 'Feb', revenue: 52341, orders: 267, users: 1456 },
  { month: 'Mar', revenue: 48923, orders: 245, users: 1389 },
  { month: 'Apr', revenue: 61234, orders: 312, users: 1678 },
  { month: 'May', revenue: 58976, orders: 298, users: 1589 },
  { month: 'Jun', revenue: 67845, orders: 345, users: 1823 },
  { month: 'Jul', revenue: 72156, orders: 367, users: 1945 },
  { month: 'Aug', revenue: 69834, orders: 356, users: 1876 },
  { month: 'Sep', revenue: 75923, orders: 389, users: 2034 },
  { month: 'Oct', revenue: 81245, orders: 412, users: 2156 },
  { month: 'Nov', revenue: 87634, orders: 445, users: 2289 },
  { month: 'Dec', revenue: 94523, orders: 478, users: 2456 }
];

export const deviceData = [
  { name: 'Desktop', value: 45, color: '#2563eb' },
  { name: 'Mobile', value: 35, color: '#10b981' },
  { name: 'Tablet', value: 20, color: '#f59e0b' }
];

export const categoryData = [
  { category: 'Electronics', sales: 45231, growth: 12.5 },
  { category: 'Clothing', sales: 32145, growth: 8.3 },
  { category: 'Books', sales: 18976, growth: -2.1 },
  { category: 'Home & Garden', sales: 25834, growth: 15.7 },
  { category: 'Sports', sales: 19456, growth: 6.9 }
];

export const userGrowthData = [
  { date: '2024-01-01', users: 1234, newUsers: 45 },
  { date: '2024-02-01', users: 1456, newUsers: 67 },
  { date: '2024-03-01', users: 1389, newUsers: 52 },
  { date: '2024-04-01', users: 1678, newUsers: 89 },
  { date: '2024-05-01', users: 1589, newUsers: 73 },
  { date: '2024-06-01', users: 1823, newUsers: 94 },
  { date: '2024-07-01', users: 1945, newUsers: 112 },
  { date: '2024-08-01', users: 1876, newUsers: 98 },
  { date: '2024-09-01', users: 2034, newUsers: 125 },
  { date: '2024-10-01', users: 2156, newUsers: 134 },
  { date: '2024-11-01', users: 2289, newUsers: 145 },
  { date: '2024-12-01', users: 2456, newUsers: 167 }
];

export const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', amount: 234.50, status: 'completed', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Jane Smith', amount: 156.75, status: 'pending', date: '2024-01-15' },
  { id: 'ORD-003', customer: 'Mike Johnson', amount: 89.99, status: 'completed', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Sarah Wilson', amount: 445.20, status: 'processing', date: '2024-01-14' },
  { id: 'ORD-005', customer: 'David Brown', amount: 67.30, status: 'completed', date: '2024-01-13' }
];

export const aiInsights = [
  {
    id: 1,
    type: 'prediction',
    title: 'Revenue Growth Forecast',
    description: 'Sales expected to grow 15% next month based on current trends',
    confidence: 87,
    impact: 'high',
    action: 'Increase inventory for top-selling categories',
    trend: 'up'
  },
  {
    id: 2,
    type: 'anomaly',
    title: 'Unusual Traffic Pattern',
    description: 'Mobile traffic increased 23% this week, consider mobile optimization',
    confidence: 92,
    impact: 'medium',
    action: 'Review mobile user experience',
    trend: 'up'
  },
  {
    id: 3,
    type: 'opportunity',
    title: 'Customer Retention',
    description: 'Implement loyalty program to reduce 12% churn rate',
    confidence: 78,
    impact: 'high',
    action: 'Launch customer retention campaign',
    trend: 'down'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Inventory Warning',
    description: 'Electronics category running low, restock recommended',
    confidence: 95,
    impact: 'medium',
    action: 'Place order with suppliers',
    trend: 'down'
  }
];

export const kpiData = {
  revenue: {
    current: 94523,
    previous: 87634,
    change: 7.9,
    target: 100000
  },
  users: {
    current: 2456,
    previous: 2289,
    change: 7.3,
    target: 2500
  },
  orders: {
    current: 478,
    previous: 445,
    change: 7.4,
    target: 500
  },
  conversion: {
    current: 3.2,
    previous: 2.9,
    change: 10.3,
    target: 3.5
  }
};

// Traffic data for analytics page
export const trafficData = [
  { date: '2024-01-01', visitors: 1234, pageViews: 3456, sessions: 2345 },
  { date: '2024-01-02', visitors: 1456, pageViews: 4123, sessions: 2678 },
  { date: '2024-01-03', visitors: 1389, pageViews: 3890, sessions: 2456 },
  { date: '2024-01-04', visitors: 1678, pageViews: 4567, sessions: 2890 },
  { date: '2024-01-05', visitors: 1589, pageViews: 4234, sessions: 2734 },
  { date: '2024-01-06', visitors: 1823, pageViews: 4890, sessions: 3123 },
  { date: '2024-01-07', visitors: 1945, pageViews: 5234, sessions: 3345 },
  { date: '2024-01-08', visitors: 1876, pageViews: 5012, sessions: 3234 },
  { date: '2024-01-09', visitors: 2034, pageViews: 5456, sessions: 3456 },
  { date: '2024-01-10', visitors: 2156, pageViews: 5789, sessions: 3678 },
  { date: '2024-01-11', visitors: 2289, pageViews: 6123, sessions: 3890 },
  { date: '2024-01-12', visitors: 2456, pageViews: 6567, sessions: 4123 },
  { date: '2024-01-13', visitors: 2234, pageViews: 6234, sessions: 3945 },
  { date: '2024-01-14', visitors: 2345, pageViews: 6456, sessions: 4056 },
  { date: '2024-01-15', visitors: 2567, pageViews: 6890, sessions: 4234 },
  { date: '2024-01-16', visitors: 2678, pageViews: 7123, sessions: 4456 },
  { date: '2024-01-17', visitors: 2789, pageViews: 7345, sessions: 4567 },
  { date: '2024-01-18', visitors: 2890, pageViews: 7567, sessions: 4678 },
  { date: '2024-01-19', visitors: 2945, pageViews: 7789, sessions: 4789 },
  { date: '2024-01-20', visitors: 3123, pageViews: 8123, sessions: 4945 },
  { date: '2024-01-21', visitors: 3234, pageViews: 8345, sessions: 5123 },
  { date: '2024-01-22', visitors: 3345, pageViews: 8567, sessions: 5234 },
  { date: '2024-01-23', visitors: 3456, pageViews: 8789, sessions: 5345 },
  { date: '2024-01-24', visitors: 3567, pageViews: 9123, sessions: 5456 },
  { date: '2024-01-25', visitors: 3678, pageViews: 9345, sessions: 5567 },
  { date: '2024-01-26', visitors: 3789, pageViews: 9567, sessions: 5678 },
  { date: '2024-01-27', visitors: 3890, pageViews: 9789, sessions: 5789 },
  { date: '2024-01-28', visitors: 3945, pageViews: 9945, sessions: 5890 },
  { date: '2024-01-29', visitors: 4123, pageViews: 10234, sessions: 6123 },
  { date: '2024-01-30', visitors: 4234, pageViews: 10456, sessions: 6234 }
];