import React from 'react'
import { cn } from '@/lib/utils'

interface SkipNavigationProps {
  links: Array<{
    href: string
    label: string
  }>
  className?: string
}

export const SkipNavigation: React.FC<SkipNavigationProps> = ({ 
  links, 
  className 
}) => {
  return (
    <div className={cn("sr-only focus-within:not-sr-only", className)}>
      <div className="fixed top-0 left-0 z-[9999] bg-primary text-primary-foreground p-2 rounded-br-md">
        <nav aria-label="Skip navigation">
          <ul className="flex space-x-2">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="inline-block px-3 py-1 text-sm font-medium bg-primary-foreground text-primary rounded focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    const target = document.querySelector(link.href)
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' })
                      // Focus the target element if it's focusable
                      if (target instanceof HTMLElement) {
                        target.focus()
                      }
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SkipNavigation