import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  FileText,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'
import { exportToCSV, exportToPDF, generateSampleAnalyticsData } from '../../utils/exportUtils'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { trafficData } from '../../data/mockData'

const AnalyticsPage: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false)
  
  const metrics = [
    { title: 'Page Views', value: '24,567', change: '+12.5%', changeType: 'positive' as const, icon: Eye },
    { title: 'Unique Visitors', value: '8,234', change: '+8.2%', changeType: 'positive' as const, icon: Users },
    { title: 'Bounce Rate', value: '34.2%', change: '-2.1%', changeType: 'positive' as const, icon: MousePointer },
    { title: 'Avg. Session', value: '3m 42s', change: '+15.3%', changeType: 'positive' as const, icon: Clock },
  ]

  const topPages = [
    { page: '/dashboard', views: 5234, percentage: 21.3 },
    { page: '/orders', views: 3456, percentage: 14.1 },
    { page: '/products', views: 2890, percentage: 11.8 },
    { page: '/customers', views: 2345, percentage: 9.6 },
    { page: '/reports', views: 1987, percentage: 8.1 },
  ]

  const trafficSources = [
    { source: 'Direct', visitors: 3456, percentage: 42.0, color: 'bg-blue-500' },
    { source: 'Search Engines', visitors: 2345, percentage: 28.5, color: 'bg-green-500' },
    { source: 'Social Media', visitors: 1234, percentage: 15.0, color: 'bg-purple-500' },
    { source: 'Referrals', visitors: 987, percentage: 12.0, color: 'bg-orange-500' },
    { source: 'Email', visitors: 212, percentage: 2.5, color: 'bg-pink-500' },
  ]

  const deviceStats = [
    { device: 'Desktop', users: 4567, percentage: 55.5 },
    { device: 'Mobile', users: 2890, percentage: 35.1 },
    { device: 'Tablet', users: 777, percentage: 9.4 },
  ]

  const handleExportCSV = async () => {
    setIsExporting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate loading
      const data = generateSampleAnalyticsData()
      exportToCSV(data, 'analytics-report')
      toast.success('CSV report exported successfully!')
    } catch (error) {
      toast.error('Failed to export CSV report')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate loading
      const data = generateSampleAnalyticsData()
      exportToPDF(data, 'analytics-report', 'Analytics Report')
      toast.success('PDF report exported successfully!')
    } catch (error) {
      toast.error('Failed to export PDF report')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your website performance</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            onClick={handleExportCSV}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileText className="mr-2 h-4 w-4" />
            )}
            Export CSV
          </Button>
          <Button 
            onClick={handleExportPDF}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {metric.changeType === 'positive' ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
                )}
                <span className={metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </span>
                <span className="ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Traffic Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Website traffic for the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="pageViewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748b"
                      fontSize={12}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={12}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value: number, name: string) => [
                        value.toLocaleString(), 
                        name === 'visitors' ? 'Visitors' : name === 'pageViews' ? 'Page Views' : 'Sessions'
                      ]}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="pageViews"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#pageViewsGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="url(#visitorsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Visitors by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceStats.map((device) => (
                    <div key={device.device} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {device.device === 'Desktop' && <Monitor className="h-4 w-4 text-muted-foreground" />}
                        {device.device === 'Mobile' && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                        {device.device === 'Tablet' && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                        <span className="text-sm font-medium text-foreground">{device.device}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{device.users.toLocaleString()}</span>
                        <Badge variant="outline">{device.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-mono text-muted-foreground">#{index + 1}</span>
                      <span className="text-sm font-medium text-foreground">{page.page}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</span>
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${page.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-12">{page.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${source.color}`} />
                        <span className="text-sm font-medium text-foreground">{source.source}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{source.visitors.toLocaleString()}</span>
                        <Badge variant="outline">{source.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Data */}
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Visitors by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Geographic map would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Behavior</CardTitle>
              <CardDescription>How users interact with your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">User behavior analytics would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Tracking</CardTitle>
              <CardDescription>Track your conversion goals and funnels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Conversion tracking would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AnalyticsPage