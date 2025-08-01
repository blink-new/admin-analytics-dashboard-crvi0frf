import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://epdcvyrcqyqduzqaenyk.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZGN2eXJjcXlxZHV6cWFlbnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMTg2MDgsImV4cCI6MjA2OTU5NDYwOH0.ppyOYgfwfzQo9ElS98wBIGtWdhQAmoafp_wVCRCEE24'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Environment variables:', {
    VITE_SUPABASE_URL: supabaseUrl ? 'Set' : 'Missing',
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? 'Set' : 'Missing'
  })
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}

export interface DatabaseUser {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: Date
}

// Helper function to transform Supabase user to our User type
export const transformUser = (user: any, profile?: Profile): DatabaseUser => {
  return {
    id: user.id,
    email: user.email,
    name: profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    avatar: profile?.avatar_url || user.user_metadata?.avatar_url,
    role: profile?.role || 'user',
    createdAt: new Date(user.created_at)
  }
}