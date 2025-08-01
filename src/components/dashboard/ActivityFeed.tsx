import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  User, 
  UserPlus, 
  CreditCard, 
  Settings, 
  Database, 
  AlertTriangle,
  Clock
} from "lucide-react"
import { useEffect, useState } from "react"
import { blink } from "@/blink/client"

interface Activity {
  id: string
  activityType: string
  description: string
  metadata?: string
  createdAt: string
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'user_login':
      return <User className="h-4 w-4" />
    case 'user_registration':
      return <UserPlus className="h-4 w-4" />
    case 'payment_received':
      return <CreditCard className="h-4 w-4" />
    case 'user_updated':
      return <Settings className="h-4 w-4" />
    case 'system_backup':
      return <Database className="h-4 w-4" />
    case 'user_suspended':
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

function getActivityColor(type: string) {
  switch (type) {
    case 'user_login':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case 'user_registration':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'payment_received':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
    case 'user_updated':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'system_backup':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    case 'user_suspended':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`
  } else {
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await blink.db.activityFeed.list({
          orderBy: { createdAt: 'desc' },
          limit: 10
        })
        setActivities(data)
      } catch (error) {
        console.error('Failed to fetch activities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest system and user activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="animate-pulse bg-muted h-8 w-8 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="animate-pulse bg-muted h-4 w-3/4 rounded"></div>
                  <div className="animate-pulse bg-muted h-3 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest system and user activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getActivityColor(activity.activityType)}`}>
                  {getActivityIcon(activity.activityType)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity.createdAt)}
                  </p>
                  {activity.metadata && (
                    <div className="text-xs text-muted-foreground">
                      {(() => {
                        try {
                          const metadata = JSON.parse(activity.metadata)
                          if (metadata.amount) {
                            return `Amount: $${metadata.amount}`
                          }
                          if (metadata.backup_size) {
                            return `Size: ${metadata.backup_size}, Duration: ${metadata.duration}`
                          }
                          if (metadata.reason) {
                            return `Reason: ${metadata.reason}`
                          }
                          if (metadata.ip) {
                            return `IP: ${metadata.ip}`
                          }
                          return null
                        } catch {
                          return null
                        }
                      })()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}