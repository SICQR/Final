// Weather service using OpenWeatherMap API
export interface WeatherData {
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  location: string
  icon: string
}

export const weatherService = {
  async getCurrentWeather(city: string = 'London'): Promise<WeatherData> {
    const apiKey = process.env.OPENWEATHER_API_KEY
    if (!apiKey) {
      // Return mock data if no API key
      return {
        temperature: 18,
        description: 'Cloudy with a chance of mess',
        humidity: 65,
        windSpeed: 12,
        location: 'London',
        icon: '04d'
      }
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      
      if (!response.ok) throw new Error('Weather fetch failed')
      
      const data = await response.json()
      
      return {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind?.speed || 0),
        location: data.name,
        icon: data.weather[0].icon
      }
    } catch (error) {
      console.error('Weather API error:', error)
      // Return fallback data
      return {
        temperature: 18,
        description: 'Weather unavailable',
        humidity: 65,
        windSpeed: 12,
        location: city,
        icon: '04d'
      }
    }
  }
}

// QR Code scanning utilities
export const qrService = {
  async processQRScan(qrData: string, userId?: string) {
    // Process QR code data - could be product links, event check-ins, AR unlocks
    console.log('QR Scanned:', qrData, 'User:', userId)
    
    // Check if it's a HOTMESS affiliate link
    if (qrData.includes('hotmessldn.com/scan/')) {
      const affiliateId = qrData.split('/scan/')[1]
      
      // Track scan for affiliate
      if (userId) {
        // TODO: Update user scan count and affiliate earnings
        console.log('Affiliate scan tracked:', affiliateId)
      }
      
      return {
        type: 'affiliate',
        affiliateId,
        reward: '£0.10',
        message: 'Scan tracked! Earnings added to your account.'
      }
    }
    
    // Check if it's an AR unlock code
    if (qrData.startsWith('HOTMESS_AR_')) {
      return {
        type: 'ar_unlock',
        experience: qrData.replace('HOTMESS_AR_', ''),
        message: 'AR experience unlocked!'
      }
    }
    
    // Default: external link
    return {
      type: 'external',
      url: qrData,
      message: 'QR code scanned successfully'
    }
  }
}

// Analytics tracking
export const analytics = {
  track(event: string, properties?: Record<string, any>) {
    // Track to Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties)
    }
    
    // Also log for development
    console.log('Analytics:', event, properties)
  },
  
  trackPageView(url: string) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url
      })
    }
  }
}