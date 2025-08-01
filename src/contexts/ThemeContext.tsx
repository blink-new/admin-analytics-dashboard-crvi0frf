import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
  isDark: boolean
  toggleDarkMode: () => void
  primaryColor: string
  accentColor: string
  updateColors: (primary: string, accent: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme-dark')
    return saved ? JSON.parse(saved) : false
  })

  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('theme-primary') || '#2563eb'
  })

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('theme-accent') || '#10b981'
  })

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  const updateColors = (primary: string, accent: string) => {
    setPrimaryColor(primary)
    setAccentColor(accent)
  }

  useEffect(() => {
    localStorage.setItem('theme-dark', JSON.stringify(isDark))
    
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('theme-primary', primaryColor)
    localStorage.setItem('theme-accent', accentColor)
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--primary', primaryColor)
    document.documentElement.style.setProperty('--accent', accentColor)
    
    // Convert hex to HSL for Tailwind
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255
      const g = parseInt(hex.slice(3, 5), 16) / 255
      const b = parseInt(hex.slice(5, 7), 16) / 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0, s = 0
      const l = (max + min) / 2

      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break
          case g: h = (b - r) / d + 2; break
          case b: h = (r - g) / d + 4; break
        }
        h /= 6
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
    }

    document.documentElement.style.setProperty('--primary-hsl', hexToHsl(primaryColor))
    document.documentElement.style.setProperty('--accent-hsl', hexToHsl(accentColor))
  }, [primaryColor, accentColor])

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleDarkMode,
      primaryColor,
      accentColor,
      updateColors
    }}>
      {children}
    </ThemeContext.Provider>
  )
}