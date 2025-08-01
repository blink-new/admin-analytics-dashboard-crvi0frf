import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, TrendingUp, Users, BarChart3 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

const WelcomeCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has seen welcome card before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
    if (!hasSeenWelcome) {
      // Show welcome card after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('hasSeenWelcome', 'true')
  }

  const features = [
    {
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      title: "Real-time Analytics",
      description: "Monitor your business metrics in real-time"
    },
    {
      icon: <Users className="h-5 w-5 text-green-600" />,
      title: "User Management",
      description: "Manage users, roles, and permissions"
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-purple-600" />,
      title: "Advanced Reports",
      description: "Generate detailed reports and insights"
    }
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Card className="w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="h-6 w-6 text-yellow-500" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Welcome to your Dashboard!
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  You're all set! Here's what you can do with your new admin dashboard:
                </p>

                <div className="space-y-4 mb-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleClose}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="px-4"
                  >
                    Skip
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeCard