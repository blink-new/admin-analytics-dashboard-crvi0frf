import { useEffect, useRef } from 'react'

export const useFocusManagement = () => {
  const focusableElementsSelector = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[role="button"]:not([disabled])',
    '[role="link"]:not([disabled])'
  ].join(', ')

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(focusableElementsSelector)
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }

  const focusFirstElement = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(focusableElementsSelector)
    const firstElement = focusableElements[0] as HTMLElement
    firstElement?.focus()
  }

  const restoreFocus = (element: HTMLElement | null) => {
    if (element && document.contains(element)) {
      element.focus()
    }
  }

  return {
    trapFocus,
    focusFirstElement,
    restoreFocus,
    focusableElementsSelector
  }
}

export const useKeyboardNavigation = (
  items: any[],
  onSelect: (item: any, index: number) => void,
  isOpen: boolean = true
) => {
  const selectedIndexRef = useRef(-1)

  useEffect(() => {
    if (!isOpen) {
      selectedIndexRef.current = -1
    }
  }, [isOpen])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen || items.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        selectedIndexRef.current = selectedIndexRef.current < items.length - 1 
          ? selectedIndexRef.current + 1 
          : 0
        break
      case 'ArrowUp':
        e.preventDefault()
        selectedIndexRef.current = selectedIndexRef.current > 0 
          ? selectedIndexRef.current - 1 
          : items.length - 1
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndexRef.current >= 0 && selectedIndexRef.current < items.length) {
          onSelect(items[selectedIndexRef.current], selectedIndexRef.current)
        }
        break
      case 'Escape':
        e.preventDefault()
        selectedIndexRef.current = -1
        break
    }
  }

  return {
    selectedIndex: selectedIndexRef.current,
    handleKeyDown
  }
}