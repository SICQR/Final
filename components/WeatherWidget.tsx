'use client'

import { useState, useEffect } from 'react'
import { weatherService, WeatherData } from '@/lib/services'

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await weatherService.getCurrentWeather('London')
        setWeather(data)
      } catch (error) {
        console.error('Weather fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    // Update weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 animate-pulse">
        <div className="h-6 bg-gray-800 rounded mb-2"></div>
        <div className="h-4 bg-gray-800 rounded"></div>
      </div>
    )
  }

  if (!weather) return null

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-sm text-hotpink mb-1">
            {weather.location} Vibes
          </h3>
          <p className="text-2xl font-bold">{weather.temperature}°C</p>
          <p className="text-sm text-gray-400 capitalize">
            {weather.description}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl mb-2">
            {weather.icon === '01d' && '☀️'}
            {weather.icon === '01n' && '🌙'}
            {weather.icon === '02d' && '⛅'}
            {weather.icon === '02n' && '☁️'}
            {weather.icon === '03d' && '☁️'}
            {weather.icon === '03n' && '☁️'}
            {weather.icon === '04d' && '☁️'}
            {weather.icon === '04n' && '☁️'}
            {weather.icon === '09d' && '🌧️'}
            {weather.icon === '09n' && '🌧️'}
            {weather.icon === '10d' && '🌦️'}
            {weather.icon === '10n' && '🌧️'}
            {weather.icon === '11d' && '⛈️'}
            {weather.icon === '11n' && '⛈️'}
            {weather.icon === '13d' && '🌨️'}
            {weather.icon === '13n' && '🌨️'}
            {weather.icon === '50d' && '🌫️'}
            {weather.icon === '50n' && '🌫️'}
          </div>
          <p className="text-xs text-gray-500">
            {weather.windSpeed} mph
          </p>
        </div>
      </div>
    </div>
  )
}