import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  CreditCard, 
  FileText, 
  BarChart3, 
  Users, 
  Activity, 
  Settings, 
  HelpCircle,
  X,
  Sparkles,
  Brain,
  Shield,
  Zap
} from 'lucide-react'

interface SidebarProps {
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation()

  const navigationItems = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: null },
        { name: 'Analytics', href: '/analytics', icon: BarChart3, badge: 'New' },
      ]
    },
    {
      title: 'Management',
      items: [
        { name: 'Orders', href: '/orders', icon: ShoppingCart, badge: '12' },
        { name: 'Payments', href: '/payments', icon: CreditCard, badge: null },
        { name: 'Users', href: '/users', icon: Users, badge: null },
        { name: 'Reports', href: '/reports', icon: FileText, badge: null },
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'Activity', href: '/activity', icon: Activity, badge: null },
        { name: 'Settings', href: '/settings', icon: Settings, badge: null },
        { name: 'Help', href: '/help', icon: HelpCircle, badge: null },
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <aside className="flex h-full flex-col bg-background border-r" role="navigation" aria-label="Main navigation">
      {/* Header */}
      <header className="flex h-16 items-center justify-between px-6 border-b">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Admin Pro</h1>
            <p className="text-xs text-muted-foreground">Dashboard v2.1</p>
          </div>
        </motion.div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </header>

      {/* Navigation */}
      <motion.nav 
        className="flex-1 space-y-6 p-4 overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="Dashboard navigation"
      >
        {navigationItems.map((section, sectionIndex) => (
          <motion.div key={section.title} variants={itemVariants}>
            <section className="space-y-3" aria-labelledby={`nav-section-${sectionIndex}`}>
              <h3 
                id={`nav-section-${sectionIndex}`}
                className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {section.title}
              </h3>
              <ul className="space-y-1" role="list">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  
                  return (
                    <li key={item.name} role="none">
                      <NavLink
                        to={item.href}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`
                        }
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className={`h-4 w-4 flex-shrink-0 ${
                            isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                          }`} />
                        </motion.div>
                        <span className="flex-1 truncate">{item.name}</span>
                        {item.badge && (
                          <Badge 
                            variant={isActive ? "secondary" : "outline"} 
                            className={`text-xs ${
                              isActive 
                                ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20' 
                                : ''
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </section>
            {sectionIndex < navigationItems.length - 1 && (
              <Separator className="my-4" />
            )}
          </motion.div>
        ))}
      </motion.nav>

      {/* Footer */}
      <motion.div 
        className="border-t p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="space-y-3">
          {/* AI Status */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
            <Brain className="h-4 w-4 text-purple-600" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-purple-900">AI Assistant</p>
              <p className="text-xs text-purple-600">Online & Learning</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>

          {/* System Status */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Shield className="h-3 w-3 text-green-600" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Zap className="h-3 w-3 text-yellow-600" />
              <span>Fast</span>
            </div>
          </div>
        </div>
      </motion.div>
    </aside>
  )
}

export default Sidebar