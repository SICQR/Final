"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { useRadioStore } from "@/lib/stores/radio";
import { 
  Play, 
  Pause, 
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Radio,
  Users,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  Clock,
  Music,
  Headphones,
  Mic,
  Signal,
  Zap,
  Star,
  Eye,
  Download,
  Bell
} from "lucide-react";

// Mock current show data
const currentShow = {
  id: '1',
  title: 'Morning Filth',
  host: 'DJ Cosmic',
  hostAvatar: '/api/placeholder/64/64',
  description: 'Starting your day with cosmic frequencies and ethereal beats',
  genre: 'Deep House',
  startTime: new Date(new Date().setHours(8, 0, 0, 0)),
  endTime: new Date(new Date().setHours(10, 0, 0, 0)),
  isLive: true,
  listeners: 247,
  duration: 120, // minutes
  elapsed: 45 // minutes
};

const currentTrack = {
  id: '1',
  title: 'Cosmic Drift',
  artist: 'Stellar Assembly',
  album: 'Orbital Frequencies',
  duration: 285, // seconds
  elapsed: 127,
  artwork: '/api/placeholder/300/300'
};

const chatMessages = [
  { id: 1, user: 'CosmicVibes', message: 'This track is absolutely incredible! 🔥', timestamp: '09:23' },
  { id: 2, user: 'BassLover92', message: 'DJ Cosmic never disappoints', timestamp: '09:24' },
  { id: 3, user: 'FrequencyHunter', message: 'Can we get an ID on this track?', timestamp: '09:25' },
  { id: 4, user: 'NightOwl', message: 'Perfect way to start the morning', timestamp: '09:26' },
  { id: 5, user: 'VibeCheck', message: 'The bass line is sending me ✨', timestamp: '09:27' },
];

const upcomingShows = [
  {
    time: '10:00',
    title: 'Lunch Break Chaos',
    host: 'MC Neon',
    genre: 'UK Garage'
  },
  {
    time: '14:00',
    title: 'Afternoon Vibes',
    host: 'Luna Bass',
    genre: 'Drum & Bass'
  },
  {
    time: '18:00',
    title: 'Rush Hour Frequencies',
    host: 'Vinyl Vixen',
    genre: 'House'
  }
];

export default function RadioPage() {
  const { isPlaying, setPlaying, volume, setVolume } = useRadioStore();
  const [isMuted, setIsMuted] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    setPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = currentShow.elapsed / currentShow.duration * 100;
  const trackProgressPercentage = currentTrack.elapsed / currentTrack.duration * 100;

  useEffect(() => {
    // Auto-play handling would go here
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hidden audio element for actual streaming */}
      <audio
        ref={audioRef}
        src="/api/stream" // This would be your actual stream URL
        preload="none"
      />

      <main className="pt-20">
        {/* Hero Section with Live Player */}
        <section className="py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-hotpink/20 via-black to-hung/20" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center space-x-2 bg-red-500 p-1 rounded-full mb-6 animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full ml-3" />
                  <span className="text-white font-semibold mr-3">LIVE NOW</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-hotpink via-hung to-hotpink bg-clip-text text-transparent">
                  The Filth Frequency
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-4">
                  London&apos;s premier queer radio station broadcasting live 24/7
                </p>
                <p className="text-lg text-hotpink italic">
                  &ldquo;Press play, lover. We&apos;ll do the rest.&rdquo;
                </p>
              </motion.div>
            </div>

            {/* Main Player */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800 overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Track Info & Artwork */}
                    <div className="lg:col-span-1">
                      <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-hotpink/20 to-hung/20 rounded-xl mb-6 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-black/20" />
                          {isPlaying && (
                            <div className="absolute inset-0 bg-hotpink/10 animate-pulse" />
                          )}
                          <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            <Signal size={12} className="inline mr-1" />
                            LIVE
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-white mb-2">{currentTrack.title}</h3>
                          <p className="text-hotpink font-medium mb-1">{currentTrack.artist}</p>
                          <p className="text-gray-400 text-sm">{currentTrack.album}</p>
                        </div>
                      </div>
                    </div>

                    {/* Player Controls */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Show Info */}
                      <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-hotpink to-hung rounded-full flex items-center justify-center">
                            <Mic size={20} className="text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-heading font-bold text-white">{currentShow.title}</h2>
                            <p className="text-hung font-medium">with {currentShow.host}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4">{currentShow.description}</p>
                        
                        <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Users size={14} />
                            <span>{currentShow.listeners} listening</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Music size={14} />
                            <span>{currentShow.genre}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>Live until {currentShow.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </span>
                        </div>
                      </div>

                      {/* Progress Bars */}
                      <div className="space-y-4">
                        {/* Track Progress */}
                        <div>
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Track Progress</span>
                            <span>{formatTime(currentTrack.elapsed)} / {formatTime(currentTrack.duration)}</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1">
                            <div 
                              className="bg-gradient-to-r from-hotpink to-hung h-1 rounded-full transition-all duration-1000"
                              style={{ width: `${trackProgressPercentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Show Progress */}
                        <div>
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Show Progress</span>
                            <span>{currentShow.elapsed}m / {currentShow.duration}m</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1">
                            <div 
                              className="bg-gradient-to-r from-hung to-hotpink h-1 rounded-full"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Main Controls */}
                      <div className="flex items-center justify-center space-x-6">
                        <Button variant="ghost" size="icon" className="w-12 h-12">
                          <SkipBack size={20} />
                        </Button>
                        
                        <Button
                          variant="neon"
                          size="icon"
                          className="w-16 h-16 rounded-full group"
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? (
                            <Pause size={24} className="group-hover:scale-110 transition-transform" />
                          ) : (
                            <Play size={24} className="group-hover:scale-110 transition-transform ml-1" />
                          )}
                        </Button>
                        
                        <Button variant="ghost" size="icon" className="w-12 h-12">
                          <SkipForward size={20} />
                        </Button>
                      </div>

                      {/* Volume & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button variant="ghost" size="icon" onClick={toggleMute}>
                            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                          </Button>
                          <div className="w-24">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={isMuted ? 0 : volume}
                              onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8">{isMuted ? 0 : volume}%</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Heart size={16} className="mr-2" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 size={16} className="mr-2" />
                            Share
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setShowChat(!showChat)}
                          >
                            <MessageCircle size={16} className="mr-2" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Secondary Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Chat/Community */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-900/50 border-gray-800 h-96">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="mr-2 text-hotpink" size={20} />
                      Live Chat
                    </CardTitle>
                    <CardDescription>
                      Chat with {currentShow.listeners} other listeners
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-64">
                    <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="text-sm">
                          <span className="text-hotpink font-medium">{msg.user}</span>
                          <span className="text-gray-400 text-xs ml-2">{msg.timestamp}</span>
                          <p className="text-gray-300 mt-1">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Say something..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
                      />
                      <Button variant="neon" size="sm">
                        <MessageCircle size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Schedule & Stats */}
              <div className="lg:col-span-2 space-y-8">
                {/* Upcoming Shows */}
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-6 text-white">Coming Up Next</h3>
                  <div className="space-y-4">
                    {upcomingShows.map((show, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-gray-900/30 border-gray-800 hover:border-hotpink/30 transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-hotpink">{show.time}</div>
                                  <div className="text-xs text-gray-400">GMT</div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-white">{show.title}</h4>
                                  <p className="text-sm text-gray-400">with {show.host} • {show.genre}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Bell size={14} className="mr-2" />
                                Remind
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stream Quality & Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-gray-900/30 border-gray-800">
                    <CardContent className="p-4 text-center">
                      <Headphones className="mx-auto mb-2 text-hotpink" size={24} />
                      <div className="text-xl font-bold text-white">320kbps</div>
                      <div className="text-xs text-gray-400">Stream Quality</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-900/30 border-gray-800">
                    <CardContent className="p-4 text-center">
                      <Signal className="mx-auto mb-2 text-hung" size={24} />
                      <div className="text-xl font-bold text-white">0.2s</div>
                      <div className="text-xs text-gray-400">Latency</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-900/30 border-gray-800">
                    <CardContent className="p-4 text-center">
                      <Zap className="mx-auto mb-2 text-green-400" size={24} />
                      <div className="text-xl font-bold text-white">99.9%</div>
                      <div className="text-xs text-gray-400">Uptime</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-900 to-black">
          <div className="container mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-white">
              More Ways to Connect
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" size="lg">
                <Download className="mr-2" size={16} />
                Download App
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="mr-2" size={16} />
                View Schedule
              </Button>
              <Button variant="outline" size="lg">
                <Users className="mr-2" size={16} />
                Join Community
              </Button>
              <Button variant="neon" size="lg">
                <Star className="mr-2" size={16} />
                Become VIP
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}