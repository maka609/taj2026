'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const INACTIVITY_TIMEOUT = 30 * 60 * 1000 // 30 minutes

import { useCallback } from 'react'

export function useInactivityLogout() {
  const router = useRouter()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/portal/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }, [router])

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(logout, INACTIVITY_TIMEOUT)
    }

    const events = ['mousemove', 'keydown', 'touchstart', 'scroll']

    // Set initial timer
    resetTimer()

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer)
    })

    return () => {
      // Clean up
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach(event => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [logout])
}
