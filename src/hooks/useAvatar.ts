import { useState, useEffect } from 'react'

export const useAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    return localStorage.getItem('user-avatar') || '/api/placeholder/40/40'
  })

  const [isUploading, setIsUploading] = useState(false)

  const updateAvatar = async (file: File): Promise<boolean> => {
    setIsUploading(true)
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Create object URL for the uploaded file
      const objectUrl = URL.createObjectURL(file)
      
      // In a real app, you'd upload to a server and get back a URL
      // For demo purposes, we'll use the object URL
      setAvatarUrl(objectUrl)
      localStorage.setItem('user-avatar', objectUrl)
      
      setIsUploading(false)
      return true
    } catch (error) {
      setIsUploading(false)
      return false
    }
  }

  const removeAvatar = () => {
    const defaultAvatar = '/api/placeholder/40/40'
    setAvatarUrl(defaultAvatar)
    localStorage.setItem('user-avatar', defaultAvatar)
  }

  useEffect(() => {
    localStorage.setItem('user-avatar', avatarUrl)
  }, [avatarUrl])

  return {
    avatarUrl,
    isUploading,
    updateAvatar,
    removeAvatar
  }
}