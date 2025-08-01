import { useState, useEffect } from 'react'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'order' | 'message' | 'alert' | 'system'
  timestamp: Date
  read: boolean
  icon?: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Order Received',
    message: 'Order #12345 has been placed by John Doe',
    type: 'order',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    icon: '🛍️'
  },
  {
    id: '2',
    title: 'Payment Processed',
    message: 'Payment of $299.99 has been successfully processed',
    type: 'system',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
    icon: '💳'
  },
  {
    id: '3',
    title: 'New Message',
    message: 'You have a new message from Sarah Wilson',
    type: 'message',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: true,
    icon: '💬'
  },
  {
    id: '4',
    title: 'System Alert',
    message: 'Server maintenance scheduled for tonight at 2 AM',
    type: 'alert',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    icon: '⚠️'
  },
  {
    id: '5',
    title: 'New User Registration',
    message: 'A new user has registered: mike.johnson@email.com',
    type: 'system',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: true,
    icon: '👤'
  }
]

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window === 'undefined') return mockNotifications
    
    const saved = localStorage.getItem('notifications')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Convert timestamp strings back to Date objects
        return parsed.map((notification: any) => ({
          ...notification,
          timestamp: new Date(notification.timestamp)
        }))
      } catch (error) {
        console.error('Error parsing notifications from localStorage:', error)
        return mockNotifications
      }
    }
    return mockNotifications
  })

  const unreadCount = notifications.filter(n => !n.read).length

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

  const clearAll = () => {
    setNotifications([])
  }

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('notifications', JSON.stringify(notifications))
      } catch (error) {
        console.error('Error saving notifications to localStorage:', error)
      }
    }
  }, [notifications])

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    addNotification
  }
}