import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Search, Bell, Settings, User, LogOut, Palette, Moon, Sun, X, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/MockAuthContext'
import { useNotifications } from '../../hooks/useNotifications'
import { useSearch } from '../../hooks/useSearch'

interface HeaderProps {
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const { user, logout, isLoading } = useAuth()
  const { isDark, toggleDarkMode, primaryColor, accentColor, updateColors } = useTheme()
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications()
  const { query, setQuery, results, isOpen, openSearch, closeSearch } = useSearch()
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const [showNotifications, setShowNotifications] = useState(false)
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false)
  const [customPrimary, setCustomPrimary] = useState(primaryColor)
  const [customAccent, setCustomAccent] = useState(accentColor)

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const handleSettingsClick = () => {
    navigate('/settings')
  }

  const handleSearchResultClick = (result: any) => {
    if (result.url) {
      navigate(result.url)
    } else {
      toast.success(`Navigating to ${result.title}`)
    }
    closeSearch()
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSearchResultClick(results[selectedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        closeSearch()
        setSelectedIndex(-1)
        break
    }
  }

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id)
    toast.info(`Opened: ${notification.title}`)
  }

  const applyTheme = () => {
    updateColors(customPrimary, customAccent)
    setShowThemeCustomizer(false)
    toast.success('Theme updated successfully!')
  }

  const formatTime = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date)
    const now = new Date()
    const diff = now.getTime() - dateObj.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return dateObj.toLocaleDateString()
  }

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30"
      >
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded="false"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <div className="relative hidden md:block" id="search">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search anything... (Ctrl+K)"
              className="pl-10 w-64 lg:w-80 focus:w-96 transition-all duration-300"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={openSearch}
              onKeyDown={handleKeyDown}
              aria-label="Search dashboard"
              role="searchbox"
              aria-expanded={isOpen}
              aria-autocomplete="list"
              aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
            />
            
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isOpen && (query.length > 0 || results.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
                  role="listbox"
                  aria-label="Search results"
                >
                  {results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result, index) => (
                        <motion.div
                          key={result.id}
                          id={`search-result-${index}`}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                          className={`p-3 rounded-md cursor-pointer flex items-center space-x-3 ${
                            selectedIndex === index ? 'bg-muted' : ''
                          }`}
                          onClick={() => handleSearchResultClick(result)}
                          role="option"
                          aria-selected={selectedIndex === index}
                        >
                          <span className="text-lg">{result.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{result.title}</div>
                            <div className="text-xs text-muted-foreground">{result.subtitle}</div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {result.type}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  ) : query.length > 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No results found for "{query}"
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Search for mobile */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden" 
              onClick={openSearch}
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleDarkMode}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </motion.div>

          {/* Theme Customizer */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowThemeCustomizer(true)}
              aria-label="Customize theme colors"
            >
              <Palette className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm"
                  aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
                >
                  <Bell className="h-5 w-5" />
                </Button>
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse"
                    >
                      {unreadCount}
                    </Badge>
                  </motion.div>
                )}
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clearAll}>
                    Clear all
                  </Button>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="p-3 cursor-pointer"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <span className="text-lg flex-shrink-0">{notification.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {notification.message}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  className="relative h-8 w-8 rounded-full"
                  aria-label={`User menu for ${user?.name || 'User'}`}
                >
                  {isLoading ? (
                    <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                  ) : (
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                      alt={user?.name || 'User avatar'}
                      className="h-8 w-8 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
                      }}
                    />
                  )}
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  {isLoading ? (
                    <>
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || 'user@example.com'}
                      </p>
                    </>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.header>

      {/* Theme Customizer Dialog */}
      <Dialog open={showThemeCustomizer} onOpenChange={setShowThemeCustomizer}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customize Theme</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Primary Color</label>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="color"
                  value={customPrimary}
                  onChange={(e) => setCustomPrimary(e.target.value)}
                  className="w-12 h-8 rounded border"
                />
                <Input
                  value={customPrimary}
                  onChange={(e) => setCustomPrimary(e.target.value)}
                  placeholder="#2563eb"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Accent Color</label>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="color"
                  value={customAccent}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  className="w-12 h-8 rounded border"
                />
                <Input
                  value={customAccent}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  placeholder="#10b981"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={applyTheme} className="flex-1">
                Apply Theme
              </Button>
              <Button variant="outline" onClick={() => setShowThemeCustomizer(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Search Dialog */}
      <Dialog open={isOpen && typeof window !== 'undefined' && window.innerWidth < 768} onOpenChange={closeSearch}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Search anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {results.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {results.map((result) => (
                  <Card key={result.id} className="cursor-pointer" onClick={() => handleSearchResultClick(result)}>
                    <CardContent className="p-3 flex items-center space-x-3">
                      <span className="text-lg">{result.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{result.title}</div>
                        <div className="text-xs text-muted-foreground">{result.subtitle}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {result.type}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Header