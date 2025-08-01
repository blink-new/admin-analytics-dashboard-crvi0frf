import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface MockUser {
  id: string
  email: string
  name: string
  avatar: string
  role: string
  createdAt: string
}

interface MockAuthContextType {
  user: MockUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithGitHub: () => Promise<void>
  updateUserProfile: (updates: Partial<MockUser>) => Promise<void>
  updateAvatar: (avatarUrl: string) => Promise<void>
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined)

// Mock users database
const MOCK_USERS: Record<string, { password: string; user: MockUser }> = {
  'admin@example.com': {
    password: 'password123',
    user: {
      id: '1',
      email: 'admin@example.com',
      name: 'John Admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      role: 'Admin',
      createdAt: '2024-01-01T00:00:00Z'
    }
  },
  'demo@example.com': {
    password: 'demo123',
    user: {
      id: '2',
      email: 'demo@example.com',
      name: 'Sarah Demo',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      role: 'Manager',
      createdAt: '2024-01-15T00:00:00Z'
    }
  },
  'user@example.com': {
    password: 'user123',
    user: {
      id: '3',
      email: 'user@example.com',
      name: 'Mike User',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'User',
      createdAt: '2024-02-01T00:00:00Z'
    }
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(MockAuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a MockAuthProvider')
  }
  return context
}

export const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('mockAuth_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Error loading saved auth state:', error)
        localStorage.removeItem('mockAuth_user')
      } finally {
        setIsLoading(false)
      }
    }

    // Simulate loading delay for realistic experience
    setTimeout(initializeAuth, 500)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      const mockUser = MOCK_USERS[email.toLowerCase()]
      
      if (!mockUser || mockUser.password !== password) {
        throw new Error('Invalid email or password')
      }

      setUser(mockUser.user)
      localStorage.setItem('mockAuth_user', JSON.stringify(mockUser.user))
      toast.success(`Welcome back, ${mockUser.user.name}!`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      toast.error(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200))

    try {
      if (MOCK_USERS[email.toLowerCase()]) {
        throw new Error('An account with this email already exists')
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      // Create new user
      const newUser: MockUser = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=150`,
        role: 'User',
        createdAt: new Date().toISOString()
      }

      // Add to mock database
      MOCK_USERS[email.toLowerCase()] = {
        password,
        user: newUser
      }

      setUser(newUser)
      localStorage.setItem('mockAuth_user', JSON.stringify(newUser))
      toast.success(`Welcome to the dashboard, ${name}!`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      toast.error(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      setUser(null)
      localStorage.removeItem('mockAuth_user')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Logout failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    try {
      const mockUser = MOCK_USERS[email.toLowerCase()]
      
      if (!mockUser) {
        throw new Error('No account found with this email address')
      }

      toast.success('Password reset email sent! (This is a demo - check console for details)')
      console.log(`🔐 Mock Password Reset for ${email}:`)
      console.log(`New temporary password: temp123`)
      console.log(`Please use this to log in, then change your password in settings.`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email'
      toast.error(errorMessage)
      throw error
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    
    // Simulate OAuth flow delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      // Simulate Google OAuth success with a demo user
      const googleUser: MockUser = {
        id: 'google_' + Date.now(),
        email: 'google.user@gmail.com',
        name: 'Google User',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        role: 'User',
        createdAt: new Date().toISOString()
      }

      setUser(googleUser)
      localStorage.setItem('mockAuth_user', JSON.stringify(googleUser))
      toast.success('Successfully signed in with Google!')
    } catch (error) {
      toast.error('Google sign-in failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGitHub = async () => {
    setIsLoading(true)
    
    // Simulate OAuth flow delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      // Simulate GitHub OAuth success with a demo user
      const githubUser: MockUser = {
        id: 'github_' + Date.now(),
        email: 'github.user@users.noreply.github.com',
        name: 'GitHub User',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
        role: 'Developer',
        createdAt: new Date().toISOString()
      }

      setUser(githubUser)
      localStorage.setItem('mockAuth_user', JSON.stringify(githubUser))
      toast.success('Successfully signed in with GitHub!')
    } catch (error) {
      toast.error('GitHub sign-in failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserProfile = async (updates: Partial<MockUser>) => {
    if (!user) return

    try {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('mockAuth_user', JSON.stringify(updatedUser))
      
      // Update in mock database if email exists
      if (MOCK_USERS[user.email]) {
        MOCK_USERS[user.email].user = updatedUser
      }
      
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
      throw error
    }
  }

  const updateAvatar = async (avatarUrl: string) => {
    if (!user) return

    try {
      const updatedUser = { ...user, avatar: avatarUrl }
      setUser(updatedUser)
      localStorage.setItem('mockAuth_user', JSON.stringify(updatedUser))
      
      // Update in mock database if email exists
      if (MOCK_USERS[user.email]) {
        MOCK_USERS[user.email].user = updatedUser
      }
      
      toast.success('Avatar updated successfully!')
    } catch (error) {
      console.error('Error updating avatar:', error)
      toast.error('Failed to update avatar')
      throw error
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    resetPassword,
    loginWithGoogle,
    loginWithGitHub,
    updateUserProfile,
    updateAvatar
  }

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  )
}