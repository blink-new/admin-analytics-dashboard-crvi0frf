import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from './contexts/ThemeContext'
import { MockAuthProvider } from './contexts/MockAuthContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import MockProtectedRoute from './components/auth/MockProtectedRoute'
import DashboardLayout from './components/dashboard/DashboardLayout'
import Dashboard from './components/dashboard/Dashboard'
import OrdersPage from './components/dashboard/OrdersPage'
import PaymentsPage from './components/dashboard/PaymentsPage'
import ReportsPage from './components/dashboard/ReportsPage'
import ProfilePage from './components/dashboard/ProfilePage'
import ActivityPage from './components/dashboard/ActivityPage'
import HelpPage from './components/dashboard/HelpPage'
import SettingsPage from './components/dashboard/SettingsPage'
import UsersPage from './components/dashboard/UsersPage'
import AnalyticsPage from './components/dashboard/AnalyticsPage'
import WelcomeCard from './components/onboarding/WelcomeCard'
import TestApp from './TestApp'

function App() {
  // Debug mode - check if we can render without auth
  const debugMode = window.location.search.includes('debug=true')
  const testMode = window.location.search.includes('test=true')
  
  if (testMode) {
    return <TestApp />
  }
  
  if (debugMode) {
    return (
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="payments" element={<PaymentsPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="activity" element={<ActivityPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="help" element={<HelpPage />} />
              </Route>
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </ThemeProvider>
    )
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <MockAuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <MockProtectedRoute>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="payments" element={<PaymentsPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="activity" element={<ActivityPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="help" element={<HelpPage />} />
                  </Route>
                </Routes>
                <WelcomeCard />
              </MockProtectedRoute>
              <Toaster position="top-right" />
            </div>
          </Router>
        </MockAuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App