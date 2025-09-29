"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { useAuthStore } from "@/lib/stores/auth";
import { 
  MessageCircle, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  Star,
  Crown,
  Heart,
  Zap,
  Shield,
  Gift,
  ExternalLink,
  Plus,
  Sparkles,
  Music,
  Camera,
  Send,
  UserPlus,
  Settings,
  Bell,
  Hash
} from "lucide-react";

const communityChannels = [
  {
    id: 'general',
    name: '#general',
    description: 'Main community chat for all HOTMESS listeners',
    members: 2847,
    isPublic: true,
    icon: Hash,
    activity: 'Very Active'
  },
  {
    id: 'music-discovery',
    name: '#music-discovery',
    description: 'Share tracks, get recommendations, discover new sounds',
    members: 1523,
    isPublic: true,
    icon: Music,
    activity: 'Active'
  },
  {
    id: 'aftercare',
    name: '#aftercare',
    description: 'Support, check-ins, and community wellness',
    members: 892,
    isPublic: true,
    icon: Heart,
    activity: 'Active'
  },
  {
    id: 'events',
    name: '#events',
    description: 'Upcoming shows, parties, and community meetups',
    members: 2134,
    isPublic: true,
    icon: Calendar,
    activity: 'Very Active'
  },
  {
    id: 'vip-lounge',
    name: '#vip-lounge',
    description: 'Exclusive channel for premium members',
    members: 347,
    isPublic: false,
    icon: Crown,
    activity: 'Exclusive'
  },
  {
    id: 'host-chat',
    name: '#host-chat',
    description: 'Direct access to HOTMESS hosts and crew',
    members: 156,
    isPublic: false,
    icon: Star,
    activity: 'Premium'
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'HOTMESS Friday Night Live',
    description: 'Special live show with guest DJ performances and community Q&A',
    date: '2024-12-06',
    time: '22:00',
    location: 'Telegram Voice Chat',
    type: 'Virtual Event',
    attendees: 234,
    isVip: false
  },
  {
    id: 2,
    title: 'VIP Listening Party',
    description: 'Exclusive preview of upcoming tracks with host commentary',
    date: '2024-12-08',
    time: '20:00',
    location: 'VIP Voice Channel',
    type: 'VIP Only',
    attendees: 45,
    isVip: true
  },
  {
    id: 3,
    title: 'Community Meetup - East London',
    description: 'IRL gathering at local queer-friendly venue with DJ set',
    date: '2024-12-15',
    time: '19:00',
    location: 'The Glory, Haggerston',
    type: 'In-Person',
    attendees: 67,
    isVip: false
  },
  {
    id: 4,
    title: 'Aftercare Workshop',
    description: 'Mental health and wellness session with professional facilitators',
    date: '2024-12-20',
    time: '18:00',
    location: 'Community Voice Chat',
    type: 'Wellness',
    attendees: 89,
    isVip: false
  }
];

const communityStats = [
  { label: 'Active Members', value: '5.2K+', icon: Users },
  { label: 'Messages Daily', value: '12K+', icon: MessageCircle },
  { label: 'Events Monthly', value: '15+', icon: Calendar },
  { label: 'Countries', value: '23', icon: MapPin }
];

const communityRules = [
  'Respect all community members regardless of background',
  'No harassment, hate speech, or discriminatory language',
  'Keep content appropriate and safe for work',
  'No spam, excessive self-promotion, or irrelevant content',
  'Use appropriate channels for different types of discussions',
  'Support each other and practice aftercare principles'
];

export default function CommunityPage() {
  const [email, setEmail] = useState('');
  const { user, isAuthenticated } = useAuthStore();

  const canAccessVip = user?.membership === 'premium' || user?.membership === 'vip';
  const canAccessExclusive = user?.membership === 'vip';

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-hotpink/10 via-black to-hung/10" />
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-hotpink to-hung p-1 rounded-full mb-6">
                <Users className="text-black ml-3" size={20} />
                <span className="text-black font-semibold mr-3">COMMUNITY HUB</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-hotpink via-hung to-hotpink bg-clip-text text-transparent">
                Join the Frequency
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Connect with fellow listeners, share music, get support, and be part of London&apos;s most inclusive radio community. 
                Hand &apos;n&apos; hand is the only way to land.
              </p>

              {/* Community Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
                {communityStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-hotpink to-hung flex items-center justify-center">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              <Button variant="neon" size="xl" className="group">
                <ExternalLink className="mr-2" size={20} />
                Join Telegram Community
                <Sparkles className="ml-2 group-hover:animate-pulse" size={16} />
              </Button>
              
              <p className="text-sm text-gray-400 mt-4">
                Free to join • 5,200+ active members • Moderated 24/7
              </p>
            </motion.div>
          </div>
        </section>

        {/* Community Channels */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                Community Channels
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Different spaces for different vibes. Find your crew and dive into conversations that matter.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityChannels.map((channel, index) => {
                const Icon = channel.icon;
                const canAccess = channel.isPublic || 
                                (channel.id === 'vip-lounge' && canAccessVip) ||
                                (channel.id === 'host-chat' && canAccessExclusive);

                return (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className={`h-full transition-all duration-300 overflow-hidden ${
                      !canAccess 
                        ? 'bg-gray-900/30 border-gray-800 opacity-60' 
                        : !channel.isPublic
                          ? 'border-hung bg-gradient-to-br from-hung/10 to-hotpink/10 shadow-lg'
                          : 'bg-gray-900/50 border-gray-800 hover:border-hotpink/50'
                    }`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            !channel.isPublic
                              ? 'bg-gradient-to-br from-hung to-hotpink'
                              : 'bg-gradient-to-br from-hotpink to-hung'
                          }`}>
                            <Icon size={20} className="text-white" />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {!channel.isPublic && (
                              <Shield size={16} className="text-hung" />
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              channel.activity === 'Very Active' ? 'bg-green-500/20 text-green-400' :
                              channel.activity === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>
                              {channel.activity}
                            </span>
                          </div>
                        </div>
                        
                        <CardTitle className={`text-lg mb-2 ${
                          canAccess ? 'text-white group-hover:text-hotpink transition-colors' : 'text-gray-500'
                        }`}>
                          {channel.name}
                        </CardTitle>
                        
                        <CardDescription className="text-gray-400">
                          {channel.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400 flex items-center space-x-1">
                            <Users size={14} />
                            <span>{channel.members.toLocaleString()} members</span>
                          </span>
                          
                          {canAccess ? (
                            <Button variant="ghost" size="sm" className="group/btn">
                              Join Channel
                              <ExternalLink className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={14} />
                            </Button>
                          ) : (
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Crown size={12} />
                              <span>Premium Required</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                Upcoming Events
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                From virtual listening parties to IRL meetups, there&apos;s always something happening in the HOTMESS community.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className={`h-full transition-all duration-300 overflow-hidden ${
                    event.isVip
                      ? 'border-hung bg-gradient-to-br from-hung/10 to-hotpink/10 shadow-lg'
                      : 'bg-gray-900/50 border-gray-800 hover:border-hotpink/50'
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              event.type === 'VIP Only' ? 'bg-hung/20 text-hung' :
                              event.type === 'Virtual Event' ? 'bg-blue-500/20 text-blue-400' :
                              event.type === 'In-Person' ? 'bg-green-500/20 text-green-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>
                              {event.type}
                            </span>
                            {event.isVip && (
                              <Crown size={14} className="text-hung" />
                            )}
                          </div>
                          <CardTitle className="text-xl group-hover:text-hotpink transition-colors">
                            {event.title}
                          </CardTitle>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-400 flex items-center space-x-1">
                            <Users size={14} />
                            <span>{event.attendees} going</span>
                          </div>
                        </div>
                      </div>
                      
                      <CardDescription className="text-gray-300">
                        {event.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Calendar size={14} />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Clock size={14} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 col-span-2">
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <Button 
                          variant={event.isVip ? "luxury" : "neon"} 
                          size="sm"
                          disabled={event.isVip && !canAccessVip}
                        >
                          {event.isVip && !canAccessVip ? (
                            <>
                              <Crown className="mr-2" size={14} />
                              VIP Required
                            </>
                          ) : (
                            <>
                              <UserPlus className="mr-2" size={14} />
                              Join Event
                            </>
                          )}
                        </Button>
                        
                        <Button variant="ghost" size="sm">
                          <Bell className="mr-2" size={14} />
                          Remind Me
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                Community Guidelines
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We&apos;re building a safe, inclusive space for everyone. Help us keep it that way by following these simple guidelines.
              </p>
            </motion.div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {communityRules.map((rule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-hotpink to-hung flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{rule}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-hotpink/10 rounded-lg border border-hotpink/20">
                  <p className="text-gray-300 text-center">
                    <Heart className="inline mr-2" size={16} />
                    Remember: HNHMESS isn&apos;t just a hashtag—it&apos;s how we care for each other.
                    <Heart className="inline ml-2" size={16} />
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-hotpink via-hung to-hotpink">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Users className="mx-auto mb-6 text-black" size={48} />
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-black mb-6">
                Ready to join the family?
              </h2>
              <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
                Connect with 5,200+ listeners who share your vibe. Music, support, events, and aftercare—all in one place.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Button variant="ghost" size="xl" className="bg-black text-white hover:bg-black/80">
                  <ExternalLink className="mr-2" size={20} />
                  Join Telegram
                </Button>
                {!isAuthenticated && (
                  <Button variant="ghost" size="xl" className="text-black border-black hover:bg-black hover:text-white">
                    <UserPlus className="mr-2" size={20} />
                    Create Account
                  </Button>
                )}
              </div>
              
              <p className="text-sm text-black/60">
                Free to join • Available 24/7 • Moderated community • All welcome
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}