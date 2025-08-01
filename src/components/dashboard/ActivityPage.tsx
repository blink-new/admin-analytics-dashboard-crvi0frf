import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { 
  Search, 
  Filter, 
  User, 
  ShoppingCart, 
  CreditCard, 
  Settings, 
  LogIn,
  LogOut,
  Edit,
  Trash2
} from 'lucide-react'

const ActivityPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const activities = [
    { 
      id: 1, 
      user: 'John Doe', 
      action: 'Created new order', 
      details: 'Order #ORD-001 for $250.00', 
      time: '2 minutes ago', 
      type: 'order',
      avatar: ''
    },
    { 
      id: 2, 
      user: 'Jane Smith', 
      action: 'Updated profile', 
      details: 'Changed email address', 
      time: '5 minutes ago', 
      type: 'profile',
      avatar: ''
    },
    { 
      id: 3, 
      user: 'Admin', 
      action: 'Payment processed', 
      details: 'Payment #PAY-003 completed', 
      time: '10 minutes ago', 
      type: 'payment',
      avatar: ''
    },
    { 
      id: 4, 
      user: 'Bob Johnson', 
      action: 'Logged in', 
      details: 'Successful login from Chrome', 
      time: '15 minutes ago', 
      type: 'auth',
      avatar: ''
    },
    { 
      id: 5, 
      user: 'Alice Brown', 
      action: 'Updated settings', 
      details: 'Changed notification preferences', 
      time: '20 minutes ago', 
      type: 'settings',
      avatar: ''
    },
    { 
      id: 6, 
      user: 'Charlie Wilson', 
      action: 'Deleted item', 
      details: 'Removed product from inventory', 
      time: '25 minutes ago', 
      type: 'delete',
      avatar: ''
    },
    { 
      id: 7, 
      user: 'Diana Prince', 
      action: 'Logged out', 
      details: 'Session ended', 
      time: '30 minutes ago', 
      type: 'auth',
      avatar: ''
    },
    { 
      id: 8, 
      user: 'System', 
      action: 'Backup completed', 
      details: 'Daily backup finished successfully', 
      time: '1 hour ago', 
      type: 'system',
      avatar: ''
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4 text-blue-600" />
      case 'payment':
        return <CreditCard className="h-4 w-4 text-green-600" />
      case 'profile':
        return <User className="h-4 w-4 text-purple-600" />
      case 'settings':
        return <Settings className="h-4 w-4 text-gray-600" />
      case 'auth':
        return <LogIn className="h-4 w-4 text-orange-600" />
      case 'delete':
        return <Trash2 className="h-4 w-4 text-red-600" />
      case 'edit':
        return <Edit className="h-4 w-4 text-yellow-600" />
      default:
        return <User className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'order':
        return <Badge className="bg-blue-100 text-blue-800">Order</Badge>
      case 'payment':
        return <Badge className="bg-green-100 text-green-800">Payment</Badge>
      case 'profile':
        return <Badge className="bg-purple-100 text-purple-800">Profile</Badge>
      case 'settings':
        return <Badge className="bg-gray-100 text-gray-800">Settings</Badge>
      case 'auth':
        return <Badge className="bg-orange-100 text-orange-800">Auth</Badge>
      case 'delete':
        return <Badge className="bg-red-100 text-red-800">Delete</Badge>
      case 'system':
        return <Badge className="bg-indigo-100 text-indigo-800">System</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const filteredActivities = activities.filter(activity =>
    activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.details.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Activity</h1>
          <p className="text-gray-600">Monitor all user activities and system events</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          Export Activity Log
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-600">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-blue-600">Currently online</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Orders Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-green-600">+8 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">System Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-600">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Real-time feed of user actions and system events</CardDescription>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    {getActivityBadge(activity.type)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.details}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getActivityIcon(activity.type)}
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ActivityPage