import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  BarChart3, 
  Users, 
  Settings,
  Zap,
  CheckCircle,
  Play,
  ArrowRight
} from 'lucide-react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  target: string
  position: 'top' | 'bottom' | 'left' | 'right'
  icon: React.ReactNode
  action?: string
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to AdminPro!',
    description: 'Let\'s take a quick tour of your new dashboard. This will only take 2 minutes.',
    target: '.onboarding-welcome',
    position: 'bottom',
    icon: <Sparkles className="h-5 w-5" />,
    action: 'Start Tour'
  },
  {
    id: 'kpi-cards',
    title: 'Key Performance Indicators',
    description: 'Monitor your most important metrics at a glance. These cards update in real-time.',
    target: '.onboarding-kpi',
    position: 'bottom',
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    id: 'charts',
    title: 'Interactive Charts',
    description: 'Visualize your data with beautiful, interactive charts. Hover over data points for details.',
    target: '.onboarding-charts',
    position: 'top',
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    id: 'sidebar',
    title: 'Navigation Menu',
    description: 'Access different sections of your dashboard. Click on any item to navigate.',
    target: '.onboarding-sidebar',
    position: 'right',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 'settings',
    title: 'Customize Your Experience',
    description: 'Personalize your dashboard with themes, layouts, and preferences.',
    target: '.onboarding-settings',
    position: 'left',
    icon: <Settings className="h-5 w-5" />
  }
]

interface OnboardingFlowProps {
  onComplete: () => void
  onSkip: () => void
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const step = onboardingSteps[currentStep]
    if (step) {
      const element = document.querySelector(step.target) as HTMLElement
      setTargetElement(element)
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // Add highlight class
        element.classList.add('onboarding-highlight')
        
        return () => {
          element.classList.remove('onboarding-highlight')
        }
      }
    }
  }, [currentStep])

  const handleComplete = () => {
    setIsVisible(false)
    setTimeout(() => {
      onComplete()
    }, 300)
  }

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setIsVisible(false)
    setTimeout(() => {
      onSkip()
    }, 300)
  }

  const getTooltipPosition = (position: string) => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2'
      case 'bottom':
        return 'top-full mt-2'
      case 'left':
        return 'right-full mr-2'
      case 'right':
        return 'left-full ml-2'
      default:
        return 'top-full mt-2'
    }
  }

  const getArrowPosition = (position: string) => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-background'
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-background'
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-background'
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-background'
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-background'
    }
  }

  if (!isVisible) return null

  const currentStepData = onboardingSteps[currentStep]
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        style={{ backdropFilter: 'blur(2px)' }}
      />

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        {targetElement && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50"
            style={{
              left: targetElement.offsetLeft + targetElement.offsetWidth / 2,
              top: targetElement.offsetTop + targetElement.offsetHeight / 2,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className={`absolute ${getTooltipPosition(currentStepData.position)} w-80`}>
              <Card className="shadow-2xl border-2 border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                        {currentStepData.icon}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Step {currentStep + 1} of {onboardingSteps.length}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={handleSkip}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                  <Progress value={progress} className="h-1" />
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm mb-4">
                    {currentStepData.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {currentStep > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={prevStep}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Back
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSkip}
                        className="text-muted-foreground"
                      >
                        Skip Tour
                      </Button>
                      <Button
                        size="sm"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        {currentStep === onboardingSteps.length - 1 ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Finish
                          </>
                        ) : currentStep === 0 && currentStepData.action ? (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            {currentStepData.action}
                          </>
                        ) : (
                          <>
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Arrow */}
              <div 
                className={`absolute w-0 h-0 border-8 ${getArrowPosition(currentStepData.position)}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Modal for first step */}
      {currentStep === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to AdminPro!
              </CardTitle>
              <CardDescription className="text-base">
                Your powerful admin dashboard is ready. Let's take a quick tour to get you started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                  <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Analytics</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950">
                  <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">User Management</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-muted-foreground"
                >
                  Skip Tour
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Tour
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  )
}

