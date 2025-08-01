import { useState, useMemo } from 'react'

export interface SearchResult {
  id: string
  title: string
  subtitle: string
  type: 'order' | 'user' | 'product' | 'page'
  url?: string
  icon?: string
}

const mockSearchData: SearchResult[] = [
  // Orders
  { id: 'order-1', title: 'Order #12345', subtitle: 'John Doe - $299.99', type: 'order', icon: '🛍️' },
  { id: 'order-2', title: 'Order #12346', subtitle: 'Sarah Wilson - $149.50', type: 'order', icon: '🛍️' },
  { id: 'order-3', title: 'Order #12347', subtitle: 'Mike Johnson - $89.99', type: 'order', icon: '🛍️' },
  
  // Users
  { id: 'user-1', title: 'John Doe', subtitle: 'john.doe@email.com', type: 'user', icon: '👤' },
  { id: 'user-2', title: 'Sarah Wilson', subtitle: 'sarah.wilson@email.com', type: 'user', icon: '👤' },
  { id: 'user-3', title: 'Mike Johnson', subtitle: 'mike.johnson@email.com', type: 'user', icon: '👤' },
  { id: 'user-4', title: 'Emily Davis', subtitle: 'emily.davis@email.com', type: 'user', icon: '👤' },
  
  // Products
  { id: 'product-1', title: 'Premium Dashboard Template', subtitle: 'Admin template - $299', type: 'product', icon: '📊' },
  { id: 'product-2', title: 'React Component Library', subtitle: 'UI components - $149', type: 'product', icon: '⚛️' },
  { id: 'product-3', title: 'Analytics Plugin', subtitle: 'Data visualization - $89', type: 'product', icon: '📈' },
  
  // Pages
  { id: 'page-1', title: 'Dashboard', subtitle: 'Main overview page', type: 'page', url: '/dashboard', icon: '🏠' },
  { id: 'page-2', title: 'Orders', subtitle: 'Order management', type: 'page', url: '/orders', icon: '📦' },
  { id: 'page-3', title: 'Analytics', subtitle: 'Data and reports', type: 'page', url: '/analytics', icon: '📊' },
  { id: 'page-4', title: 'Users', subtitle: 'User management', type: 'page', url: '/users', icon: '👥' },
  { id: 'page-5', title: 'Settings', subtitle: 'Application settings', type: 'page', url: '/settings', icon: '⚙️' }
]

export const useSearch = () => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => {
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase()
    return mockSearchData.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.subtitle.toLowerCase().includes(searchTerm)
    ).slice(0, 8) // Limit to 8 results
  }, [query])

  const openSearch = () => setIsOpen(true)
  const closeSearch = () => {
    setIsOpen(false)
    setQuery('')
  }

  return {
    query,
    setQuery,
    results,
    isOpen,
    openSearch,
    closeSearch
  }
}