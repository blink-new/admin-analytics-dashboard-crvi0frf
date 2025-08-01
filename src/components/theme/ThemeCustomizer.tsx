import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Palette, 
  X, 
  Sun, 
  Moon, 
  Monitor,
  Type,
  Layout,
  Zap,
  Download,
  Upload,
  RotateCcw,
  Check,
  Sparkles
} from 'lucide-react'

interface ThemeConfig {
  mode: 'light' | 'dark' | 'system'
  primaryColor: string
  accentColor: string
  fontFamily: string
  fontSize: number
  borderRadius: number
  compactMode: boolean
  animations: boolean
  sidebar: 'expanded' | 'collapsed' | 'auto'
}

const defaultTheme: ThemeConfig = {
  mode: 'light',
  primaryColor: '#2563eb',
  accentColor: '#10b981',
  fontFamily: 'Inter',
  fontSize: 14,
  borderRadius: 8,
  compactMode: false,
  animations: true,
  sidebar: 'expanded'
}

const colorPresets = [
  { name: 'Blue', primary: '#2563eb', accent: '#10b981' },
  { name: 'Purple', primary: '#7c3aed', accent: '#f59e0b' },
  { name: 'Green', primary: '#059669', accent: '#dc2626' },
  { name: 'Orange', primary: '#ea580c', accent: '#2563eb' },
  { name: 'Pink', primary: '#db2777', accent: '#059669' },
  { name: 'Indigo', primary: '#4f46e5', accent: '#f59e0b' }
]

const fontOptions = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Nunito', value: 'Nunito' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro' }
]

interface ThemeCustomizerProps {
  isOpen: boolean
  onClose: () => void
}

export function ThemeCustomizer({ isOpen, onClose }: ThemeCustomizerProps) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('adminpro-theme')
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme))
      } catch (error) {
        console.error('Failed to parse saved theme:', error)
      }
    }
  }, [])

  const applyTheme = (themeConfig: ThemeConfig) => {
    const root = document.documentElement
    
    // Apply colors
    root.style.setProperty('--primary', themeConfig.primaryColor)
    root.style.setProperty('--accent', themeConfig.accentColor)
    
    // Apply font
    root.style.setProperty('--font-family', themeConfig.fontFamily)
    root.style.setProperty('--font-size', `${themeConfig.fontSize}px`)
    
    // Apply border radius
    root.style.setProperty('--radius', `${themeConfig.borderRadius}px`)
    
    // Apply mode
    if (themeConfig.mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (themeConfig.mode === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      // System mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    
    // Apply compact mode
    if (themeConfig.compactMode) {
      document.body.classList.add('compact-mode')
    } else {
      document.body.classList.remove('compact-mode')
    }
    
    // Apply animations
    if (!themeConfig.animations) {
      document.body.classList.add('no-animations')
    } else {
      document.body.classList.remove('no-animations')
    }
  }

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    const newTheme = { ...theme, ...updates }
    setTheme(newTheme)
    
    if (previewMode) {
      applyTheme(newTheme)
    }
  }

  const saveTheme = () => {
    localStorage.setItem('adminpro-theme', JSON.stringify(theme))
    applyTheme(theme)
    setPreviewMode(false)
    onClose()
  }

  const resetTheme = () => {
    setTheme(defaultTheme)
    if (previewMode) {
      applyTheme(defaultTheme)
    }
  }

  const exportTheme = () => {
    const dataStr = JSON.stringify(theme, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'adminpro-theme.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedTheme = JSON.parse(e.target?.result as string)
          setTheme(importedTheme)
          if (previewMode) {
            applyTheme(importedTheme)
          }
        } catch (error) {
          console.error('Failed to import theme:', error)
        }
      }
      reader.readAsText(file)
    }
  }

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

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-4 top-16 w-96 z-50 max-h-[calc(100vh-5rem)] overflow-hidden"
    >
      <Card className="shadow-2xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <CardTitle className="text-lg">Theme Customizer</CardTitle>
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch
              checked={previewMode}
              onCheckedChange={setPreviewMode}
              id="preview-mode"
            />
            <Label htmlFor="preview-mode" className="text-sm">
              Live Preview
            </Label>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mx-3">
                <TabsTrigger value="appearance" className="text-xs">Appearance</TabsTrigger>
                <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
                <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
              </TabsList>
              
              <TabsContent value="appearance" className="p-3 space-y-4">
                {/* Theme Mode */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Theme Mode</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'light', icon: Sun, label: 'Light' },
                      { value: 'dark', icon: Moon, label: 'Dark' },
                      { value: 'system', icon: Monitor, label: 'System' }
                    ].map(({ value, icon: Icon, label }) => (
                      <Button
                        key={value}
                        variant={theme.mode === value ? 'default' : 'outline'}
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => updateTheme({ mode: value as any })}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Color Presets */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Color Presets</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs justify-start"
                        onClick={() => updateTheme({ 
                          primaryColor: preset.primary, 
                          accentColor: preset.accent 
                        })}
                      >
                        <div className="flex items-center gap-1">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: preset.primary }}
                          />
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: preset.accent }}
                          />
                          {preset.name}
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Custom Colors */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                        className="w-8 h-8 rounded border cursor-pointer"
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {theme.primaryColor}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.accentColor}
                        onChange={(e) => updateTheme({ accentColor: e.target.value })}
                        className="w-8 h-8 rounded border cursor-pointer"
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {theme.accentColor}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="layout" className="p-3 space-y-4">
                {/* Typography */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Font Family</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {fontOptions.map((font) => (
                      <Button
                        key={font.value}
                        variant={theme.fontFamily === font.value ? 'default' : 'outline'}
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => updateTheme({ fontFamily: font.value })}
                      >
                        {font.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Font Size */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Font Size</Label>
                    <span className="text-xs text-muted-foreground">{theme.fontSize}px</span>
                  </div>
                  <Slider
                    value={[theme.fontSize]}
                    onValueChange={([value]) => updateTheme({ fontSize: value })}
                    min={12}
                    max={18}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                {/* Border Radius */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Border Radius</Label>
                    <span className="text-xs text-muted-foreground">{theme.borderRadius}px</span>
                  </div>
                  <Slider
                    value={[theme.borderRadius]}
                    onValueChange={([value]) => updateTheme({ borderRadius: value })}
                    min={0}
                    max={16}
                    step={2}
                    className="w-full"
                  />
                </div>
                
                {/* Layout Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Compact Mode</Label>
                    <Switch
                      checked={theme.compactMode}
                      onCheckedChange={(checked) => updateTheme({ compactMode: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Animations</Label>
                    <Switch
                      checked={theme.animations}
                      onCheckedChange={(checked) => updateTheme({ animations: checked })}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="p-3 space-y-4">
                {/* Import/Export */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Theme Management</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={exportTheme}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".json"
                        onChange={importTheme}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs w-full"
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Import
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Reset */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Reset Theme</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 text-xs"
                    onClick={resetTheme}
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset to Default
                  </Button>
                </div>
                
                {/* Theme Info */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Theme Configuration</Label>
                  <div className="text-xs text-muted-foreground bg-muted p-2 rounded font-mono">
                    <pre>{JSON.stringify(theme, null, 2)}</pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <Separator />
          
          <div className="p-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetTheme}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={saveTheme}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Check className="h-4 w-4 mr-1" />
                Apply Theme
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}