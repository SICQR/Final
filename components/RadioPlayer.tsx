"use client";

import React, { useState, useEffect } from 'react';
import { Button, Card, LoadingSpinner } from '@/components/ui';
import { RadioShow } from '@/types';

export const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentShow, setCurrentShow] = useState<RadioShow | null>(null);
  const [shows, setShows] = useState<RadioShow[]>([]);

  useEffect(() => {
    // Fetch radio shows
    const fetchShows = async () => {
      try {
        const response = await fetch('/api/radio');
        const data = await response.json();
        if (data.success) {
          setShows(data.data);
          // Set current live show if any
          const liveShow = data.data.find((show: RadioShow) => show.isLive);
          if (liveShow) {
            setCurrentShow(liveShow);
          }
        }
      } catch (error) {
        console.error('Failed to fetch radio shows:', error);
      }
    };

    fetchShows();
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      // In a real implementation, stop the audio stream
    } else {
      setIsLoading(true);
      // In a real implementation, start the audio stream
      setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(true);
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card variant="dark" className="mb-8">
        <div className="text-center">
          <div 
            className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-300 ${
              isPlaying ? 'bg-hotpink animate-pulse' : 'bg-gray-700'
            }`}
          >
            {isLoading ? (
              <LoadingSpinner size="lg" />
            ) : (
              <div className={`w-16 h-16 rounded-full ${isPlaying ? 'bg-white' : 'bg-gray-500'}`}></div>
            )}
          </div>
          
          <p className="text-xl font-heading mb-4">
            {isPlaying ? 'NOW PLAYING' : 'OFFLINE'}
          </p>
          
          {currentShow ? (
            <>
              <p className="text-hung font-semibold text-lg">{currentShow.title}</p>
              <p className="text-gray-400">with {currentShow.dj}</p>
            </>
          ) : (
            <>
              <p className="text-hung font-semibold text-lg">HOTMESS LIVE</p>
              <p className="text-gray-400">Broadcasting from London</p>
            </>
          )}
        </div>
        
        <div className="flex justify-center mt-6 space-x-4">
          <Button 
            onClick={handlePlayPause}
            variant="primary"
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? 'Connecting...' : isPlaying ? '⏹ Stop' : '▶ Listen Live'}
          </Button>
        </div>
      </Card>

      {/* Schedule */}
      <Card variant="dark">
        <h3 className="text-2xl font-heading font-bold mb-6 text-center text-hung">
          This Week's Schedule
        </h3>
        
        <div className="space-y-4">
          {shows.map((show) => (
            <div 
              key={show.id}
              className={`p-4 rounded-lg border transition-all ${
                show.isLive 
                  ? 'border-hotpink bg-hotpink/10' 
                  : 'border-gray-700 bg-gray-800/50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-heading font-bold text-lg flex items-center">
                    {show.title}
                    {show.isLive && (
                      <span className="ml-2 px-2 py-1 bg-hotpink text-white text-xs rounded-full">
                        LIVE
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-400 text-sm mb-2">{show.description}</p>
                  <p className="text-hung font-semibold">
                    {show.schedule.day}s at {show.schedule.time} • {show.schedule.duration}min
                  </p>
                  <p className="text-gray-500 text-sm">with {show.dj}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};