import { NextResponse } from 'next/server';

export async function GET() {
  // Mock weather data for London
  const weather = {
    location: "London, UK",
    current: {
      temperature: 8,
      condition: "Partly Cloudy",
      humidity: 72,
      windSpeed: 15,
      icon: "partly-cloudy",
      feelsLike: 5
    },
    forecast: [
      {
        day: "Today",
        high: 10,
        low: 4,
        condition: "Partly Cloudy",
        icon: "partly-cloudy",
        chanceOfRain: 20
      },
      {
        day: "Tomorrow", 
        high: 12,
        low: 6,
        condition: "Sunny",
        icon: "sunny",
        chanceOfRain: 5
      },
      {
        day: "Friday",
        high: 9,
        low: 3,
        condition: "Light Rain",
        icon: "light-rain", 
        chanceOfRain: 80
      }
    ],
    vibe: "Perfect weather for a HOTMESS night out - grab a jacket for aftercare! 🧥",
    lastUpdated: new Date().toISOString()
  };

  return NextResponse.json({ weather });
}