import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Bell, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle,
  User,
  DollarSign,
  Settings,
  Mail,
  Filter,
  MoreHorizontal
} from 'lucide-react'
import { toast } from 'sonner'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  category: 'system' | 'user' | 'payment' | 'security' | 'update'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionable: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    category: 'payment',
    title: 'Payment Received',
    message: 'New payment of $299.00 from Enterprise Client received.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    actionable: true,
    action: {
      label: 'View Details',
      onClick: () => toast.success('Navigating to payment details...')
    }
  },
  {
    id: '2',
    type: 'warning',
    category: 'system',
    title: 'High CPU Usage',
    message: 'Server CPU usage has exceeded 85% for the last 10 minutes.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    actionable: true,
    action: {
      label: 'Check Status',
      onClick: () => toast.info('Opening system monitor...')
    }
  },
  {
    id: '3',
    type: 'info',
    category: 'user',
    title: 'New User Registration',
    message: '5 new users have registered in the last hour.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
    actionable: false
  },
  {
    id: '4',
    type: 'error',
    category: 'security',
    title: 'Failed Login Attempts',
    message: 'Multiple failed login attempts detected from IP 192.168.1.100.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    read: false,
    actionable: true,
    action: {
      label: 'Block IP',
      onClick: () => toast.success('IP address blocked successfully')
    }
  },
  {
    id: '5',
    type: 'info',
    category: 'update',
    title: 'System Update Available',
    message: 'AdminPro v2.1.0 is now available with new features and bug fixes.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    actionable: true,
    action: {
      label: 'Update Now',
      onClick: () => toast.info('Starting system update...')
    }
  }
]

interface NotificationSystemProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationSystem({ isOpen, onClose }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'actionable'>('all')

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)] as any,
        category: ['system', 'user', 'payment'][Math.floor(Math.random() * 3)] as any,
        title: 'New Activity',
        message: 'A new event has occurred in your system.',
        timestamp: new Date(),
        read: false,
        actionable: Math.random() > 0.5
      }
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 9)])
      
      // Show toast notification
      toast.info(newNotification.title, {
        description: newNotification.message
      })
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'user':
        return <User className="h-3 w-3" />
      case 'payment':
        return <DollarSign className="h-3 w-3" />
      case 'security':
        return <AlertTriangle className="h-3 w-3" />
      case 'update':
        return <Settings className="h-3 w-3" />
      default:
        return <Mail className="h-3 w-3" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read
      case 'actionable':
        return notification.actionable
      default:
        return true
    }
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-4 top-16 w-96 z-50"
    >
      <Card className="shadow-2xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="h-5 px-2 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant={filter === 'all' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setFilter('unread')}
              >
                Unread
              </Button>
              <Button
                variant={filter === 'actionable' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setFilter('actionable')}
              >
                Action Required
              </Button>
            </div>
            
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={markAllAsRead}
              >
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <ScrollArea className="h-96">
            <div className="space-y-1 p-3">
              <AnimatePresence>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group p-3 rounded-lg border transition-colors hover:bg-accent/50 ${
                      !notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            <Badge variant="outline" className="h-4 px-1.5 text-xs">
                              {getCategoryIcon(notification.category)}
                              <span className="ml-1 capitalize">{notification.category}</span>
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                          
                          {notification.actionable && notification.action && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={notification.action.onClick}
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredNotifications.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <Separator />
          
          <div className="p-3">
            <Button variant="ghost" size="sm" className="w-full justify-center text-xs">
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Notification Bell Component
interface NotificationBellProps {
  onClick: () => void
}

export function NotificationBell({ onClick }: NotificationBellProps) {
  const [unreadCount, setUnreadCount] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Simulate new notifications
    const interval = setInterval(() => {
      setUnreadCount(prev => prev + 1)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative"
      onClick={onClick}
    >
      <motion.div
        animate={isAnimating ? { scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Bell className="h-4 w-4" />
      </motion.div>
      {unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </motion.div>
      )}
    </Button>
  )
}