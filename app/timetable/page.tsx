"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { useRadioStore } from "@/lib/stores/radio";
import { 
  Clock, 
  Calendar,
  Play,
  Pause,
  Volume2,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Bell,
  BellRing
} from "lucide-react";

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const scheduleData = {
  Monday: [
    { time: '08:00', duration: 2, host: 'DJ Cosmic', show: 'Morning Filth', genre: 'Deep House', isLive: true },
    { time: '10:00', duration: 2, host: 'Luna Bass', show: 'Bass Breakfast', genre: 'D&B', isLive: false },
    { time: '14:00', duration: 2, host: 'MC Neon', show: 'Lunch Break Chaos', genre: 'UK Garage', isLive: false },
    { time: '18:00', duration: 3, host: 'Vinyl Vixen', show: 'Analog Rush Hour', genre: 'Classic House', isLive: false },
    { time: '22:00', duration: 4, host: 'DJ Phoenix', show: 'Night Oracle', genre: 'Techno', isLive: false },
  ],
  Tuesday: [
    { time: '08:00', duration: 2, host: 'Synth Sage', show: 'Digital Dawn', genre: 'Synthwave', isLive: false },
    { time: '12:00', duration: 2, host: 'MC Neon', show: 'Lunch Break Chaos', genre: 'Breakcore', isLive: false },
    { time: '20:00', duration: 2, host: 'DJ Cosmic', show: 'Cosmic Tuesdays', genre: 'Ambient', isLive: false },
  ],
  Wednesday: [
    { time: '09:00', duration: 2, host: 'Luna Bass', show: 'Midweek Bass', genre: 'Future Bass', isLive: false },
    { time: '12:00', duration: 2, host: 'MC Neon', show: 'Lunch Break Chaos', genre: 'Jungle', isLive: false },
    { time: '21:00', duration: 2, host: 'Synth Sage', show: 'Synth Sanctuary', genre: 'Cyberpunk', isLive: false },
  ],
  Thursday: [
    { time: '08:00', duration: 2, host: 'Vinyl Vixen', show: 'Throwback Thursday', genre: 'Disco', isLive: false },
    { time: '12:00', duration: 2, host: 'MC Neon', show: 'Lunch Break Chaos', genre: 'UK Garage', isLive: false },
    { time: '20:00', duration: 2, host: 'Luna Bass', show: 'Bass Cathedral', genre: 'Dubstep', isLive: false },
  ],
  Friday: [
    { time: '08:00', duration: 2, host: 'DJ Cosmic', show: 'Friday Frequencies', genre: 'House', isLive: false },
    { time: '12:00', duration: 2, host: 'MC Neon', show: 'Lunch Break Chaos', genre: 'Breakcore', isLive: false },
    { time: '18:00', duration: 2, host: 'Synth Sage', show: 'Friday Night Synths', genre: 'Retrowave', isLive: false },
    { time: '22:00', duration: 4, host: 'DJ Phoenix', show: 'Phoenix Rising', genre: 'Industrial', isLive: false },
  ],
  Saturday: [
    { time: '10:00', duration: 3, host: 'Luna Bass', show: 'Saturday Bass Blitz', genre: 'Drum & Bass', isLive: false },
    { time: '15:00', duration: 3, host: 'Vinyl Vixen', show: 'Weekend Vinyl Vault', genre: 'Rare Grooves', isLive: false },
    { time: '20:00', duration: 4, host: 'DJ Phoenix', show: 'Saturday Night Fever', genre: 'Dark Ambient', isLive: false },
  ],
  Sunday: [
    { time: '11:00', duration: 3, host: 'DJ Cosmic', show: 'Sunday Cosmic Brunch', genre: 'Chillout', isLive: false },
    { time: '16:00', duration: 2, host: 'Synth Sage', show: 'Sunday Synth Session', genre: 'Ambient', isLive: false },
    { time: '18:00', duration: 2, host: 'Vinyl Vixen', show: 'Analog Archives', genre: 'Classic House', isLive: false },
  ],
};

const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const isShowLive = (time: string, duration: number) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;
  
  const [showHour, showMinute] = time.split(':').map(Number);
  const showStartTime = showHour * 60 + showMinute;
  const showEndTime = showStartTime + (duration * 60);
  
  return currentTime >= showStartTime && currentTime < showEndTime;
};

export default function TimetablePage() {
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [reminders, setReminders] = useState<string[]>([]);
  const { isPlaying, setPlaying } = useRadioStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const toggleReminder = (showId: string) => {
    setReminders(prev => 
      prev.includes(showId) 
        ? prev.filter(id => id !== showId)
        : [...prev, showId]
    );
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const currentIndex = daysOfWeek.indexOf(selectedDay);
    if (direction === 'prev') {
      setSelectedDay(daysOfWeek[currentIndex === 0 ? 6 : currentIndex - 1]);
    } else {
      setSelectedDay(daysOfWeek[currentIndex === 6 ? 0 : currentIndex + 1]);
    }
  };

  const todaysSchedule = scheduleData[selectedDay as keyof typeof scheduleData] || [];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-hung/10 via-black to-hotpink/10" />
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-hung via-hotpink to-hung bg-clip-text text-transparent">
                Radio Timetable
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Never miss a beat. Plan your listening, set reminders, and stay locked to the frequency.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 text-hotpink">
                  <Clock size={16} />
                  <span>Current Time: {currentTime}</span>
                </div>
                <div className="w-px h-4 bg-gray-600" />
                <div className="flex items-center space-x-2 text-hung">
                  <Calendar size={16} />
                  <span>Today: {getCurrentDay()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Day Navigation */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateDay('prev')}
                className="text-gray-400 hover:text-white"
              >
                <ChevronLeft size={20} />
              </Button>

              <div className="flex items-center space-x-4">
                <motion.h2
                  key={selectedDay}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-heading font-bold text-white"
                >
                  {selectedDay}
                </motion.h2>
                {selectedDay === getCurrentDay() && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                    TODAY
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateDay('next')}
                className="text-gray-400 hover:text-white"
              >
                <ChevronRight size={20} />
              </Button>
            </div>

            {/* Quick Day Selector */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2 bg-gray-900/50 p-2 rounded-lg">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      selectedDay === day
                        ? 'bg-hotpink text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            {todaysSchedule.length === 0 ? (
              <div className="text-center py-16">
                <Calendar size={64} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No shows scheduled</h3>
                <p className="text-gray-500">Check back later or try another day</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todaysSchedule.map((show, index) => {
                  const showId = `${selectedDay}-${show.time}-${show.show}`;
                  const isLive = selectedDay === getCurrentDay() && isShowLive(show.time, show.duration);
                  const hasReminder = reminders.includes(showId);
                  
                  return (
                    <motion.div
                      key={showId}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <Card className={`bg-gray-900/50 border-gray-800 transition-all duration-300 overflow-hidden ${
                        isLive 
                          ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20' 
                          : 'hover:border-hotpink/50 group-hover:shadow-xl'
                      }`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              {/* Time & Duration */}
                              <div className="text-center">
                                <div className="text-2xl font-heading font-bold text-hotpink">
                                  {show.time}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {show.duration}h
                                </div>
                              </div>

                              {/* Show Info */}
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-xl font-heading font-bold text-white">
                                    {show.show}
                                  </h3>
                                  {isLive && (
                                    <div className="flex items-center space-x-1 text-red-500 text-sm font-semibold">
                                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                      <span>LIVE</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-300">
                                  <span className="flex items-center space-x-1">
                                    <Users size={14} />
                                    <span>{show.host}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <Star size={14} />
                                    <span>{show.genre}</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-3">
                              {/* Reminder Button */}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleReminder(showId)}
                                className={hasReminder ? 'text-hung' : 'text-gray-400'}
                              >
                                {hasReminder ? <BellRing size={20} /> : <Bell size={20} />}
                              </Button>

                              {/* Play/Listen Button */}
                              {isLive ? (
                                <Button
                                  variant="neon"
                                  size="sm"
                                  onClick={() => setPlaying(!isPlaying)}
                                  className="flex items-center space-x-2"
                                >
                                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                  <span>Listen</span>
                                  <Volume2 size={16} />
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" disabled>
                                  Offline
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Progress Bar for Live Shows */}
                          {isLive && (
                            <div className="mt-4">
                              <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Live Progress</span>
                                <span>2h 15m remaining</span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-1">
                                <div 
                                  className="bg-gradient-to-r from-red-500 to-hotpink h-1 rounded-full"
                                  style={{ width: '30%' }}
                                />
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Reminder Summary */}
        {reminders.length > 0 && (
          <section className="py-8 px-4 bg-gray-900/30">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h3 className="text-xl font-heading font-bold text-hung mb-4">
                  Your Reminders ({reminders.length})
                </h3>
                <p className="text-gray-300 text-sm">
                  We&apos;ll notify you before these shows start. Make sure notifications are enabled!
                </p>
              </motion.div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}