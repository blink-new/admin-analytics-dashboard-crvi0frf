import React, { createContext, useContext, useEffect, useState } from 'react'
import { User as SupabaseUser, Session, AuthError } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { supabase, transformUser, type DatabaseUser, type Profile } from '../lib/supabase'

interface AuthContextType {
  user: DatabaseUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithGitHub: () => Promise<void>
  updateUserProfile: (updates: Partial<DatabaseUser>) => Promise<void>
  updateAvatar: (avatarUrl: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DatabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  // Fetch user profile from database
  const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<DatabaseUser> => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error)
      throw error
    }

    return transformUser(supabaseUser, profile as Profile)
  }

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          return
        }

        if (initialSession?.user && mounted) {
          const userProfile = await fetchUserProfile(initialSession.user)
          setUser(userProfile)
          setSession(initialSession)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        setSession(session)
        setIsLoading(true)

        try {
          if (session?.user) {
            const userProfile = await fetchUserProfile(session.user)
            setUser(userProfile)
            
            if (event === 'SIGNED_IN') {
              toast.success('Welcome back!')
            }
          } else {
            setUser(null)
            if (event === 'SIGNED_OUT') {
              toast.success('Logged out successfully')
            }
          }
        } catch (error) {
          console.error('Error handling auth state change:', error)
          setUser(null)
        } finally {
          setIsLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        const userProfile = await fetchUserProfile(data.user)
        setUser(userProfile)
      }
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'Login failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      })

      if (error) {
        throw error
      }

      if (data.user) {
        toast.success('Account created successfully! Please check your email to verify your account.')
      }
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'Registration failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      setUser(null)
      setSession(null)
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'Logout failed')
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        throw error
      }

      toast.success('Password reset email sent!')
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'Failed to send reset email')
      throw error
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        }
      })

      if (error) {
        throw error
      }
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'Google sign-in failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGitHub = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        }
      })

      if (error) {
        throw error
      }
    } catch (error) {
      const authError = error as AuthError
      toast.error(authError.message || 'GitHub sign-in failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserProfile = async (updates: Partial<DatabaseUser>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.name,
          avatar_url: updates.avatar,
          role: updates.role,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) {
        throw error
      }

      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
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
      const { error } = await supabase
        .from('profiles')
        .update({
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) {
        throw error
      }

      const updatedUser = { ...user, avatar: avatarUrl }
      setUser(updatedUser)
    } catch (error) {
      console.error('Error updating avatar:', error)
      toast.error('Failed to update avatar')
      throw error
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user && !!session,
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
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}