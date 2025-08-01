import { useState, useEffect } from 'react'

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('adminpro-onboarding-completed')
    if (!hasCompletedOnboarding) {
      // Delay showing onboarding to let the page load
      setTimeout(() => {
        setShowOnboarding(true)
      }, 1000)
    }
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('adminpro-onboarding-completed', 'true')
    setShowOnboarding(false)
  }

  const skipOnboarding = () => {
    localStorage.setItem('adminpro-onboarding-completed', 'true')
    setShowOnboarding(false)
  }

  const resetOnboarding = () => {
    localStorage.removeItem('adminpro-onboarding-completed')
    setShowOnboarding(true)
  }

  return {
    showOnboarding,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding
  }
}