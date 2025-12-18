'use client'

import { useEffect } from 'react'

const TrackingHandler = () => {
  useEffect(() => {
    const setTrackingCookies = async () => {
      // Check if we're in the browser
      if (typeof window === 'undefined') return
      
      // Get URL parameters
      const urlParams = new URLSearchParams(window.location.search)
      const utmSource = urlParams.get('utm_source')
      const utmId = urlParams.get('utm_id')
      const utmS1 = urlParams.get('utm_s1')
      
      const hasUtmParams = utmSource || utmId || utmS1
      
      // Only set cookies if UTM parameters are present
      if (hasUtmParams) {
        try {
          // Create a new URLSearchParams with only UTM parameters
          const utmParams = new URLSearchParams()
          if (utmSource) utmParams.set('utm_source', utmSource)
          if (utmId) utmParams.set('utm_id', utmId)
          if (utmS1) utmParams.set('utm_s1', utmS1)
          
          const response = await fetch('/api/set-tracking-cookies?' + utmParams.toString())
          const result = await response.json()
          
          if (result.success) {
            console.log('Tracking cookies set successfully')
            
            // Clean the URL by removing tracking parameters
            const cleanUrl = window.location.origin + window.location.pathname
            window.history.replaceState({}, document.title, cleanUrl)
            console.log('URL cleaned successfully')
          }
        } catch (error) {
          console.error('Failed to set tracking cookies:', error)
        }
      }
    }

    setTrackingCookies()
  }, [])

  return null // This component doesn't render anything
}

export default TrackingHandler
