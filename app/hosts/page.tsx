"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { 
  Instagram, 
  Twitter, 
  Music, 
  Calendar,
  MapPin,
  Star,
  Crown,
  Heart,
  Zap
} from "lucide-react";

const hosts = [
  {
    id: 1,
    name: "DJ Cosmic",
    role: "Resident Host",
    bio: "Spinning cosmic frequencies and ethereal beats. When not behind the decks, you'll find me stargazing or collecting vintage synthesizers.",
    avatar: "/api/placeholder/300/300",
    shows: ["Morning Filth", "Cosmic Tuesdays"],
    specialties: ["Deep House", "Ambient", "Cosmic Disco"],
    socials: {
      instagram: "@djcosmic",
      twitter: "@cosmic_waves",
    },
    schedule: "Mondays 8-10am, Tuesdays 10pm-12am",
    status: "live",
    followers: "12.3k",
    badge: "resident"
  },
  {
    id: 2,
    name: "MC Neon",
    role: "Energy Curator",
    bio: "Bringing that electric energy to your lunch break. High-energy sets with a side of motivational chaos.",
    avatar: "/api/placeholder/300/300",
    shows: ["Lunch Break Chaos", "Neon Nights"],
    specialties: ["Breakcore", "Jungle", "UK Garage"],
    socials: {
      instagram: "@mcneon",
      twitter: "@neon_energy",
    },
    schedule: "Weekdays 12-2pm",
    status: "offline",
    followers: "8.7k",
    badge: "energy"
  },
  {
    id: 3,
    name: "DJ Phoenix",
    role: "Night Oracle",
    bio: "Rising from the ashes of mainstream radio with underground vibes that burn deep into your soul.",
    avatar: "/api/placeholder/300/300",
    shows: ["After Hours", "Phoenix Rising"],
    specialties: ["Techno", "Industrial", "Dark Ambient"],
    socials: {
      instagram: "@djphoenix",
      twitter: "@phoenix_burns",
    },
    schedule: "Fridays & Saturdays 10pm-2am",
    status: "upcoming",
    followers: "15.2k",
    badge: "oracle"
  },
  {
    id: 4,
    name: "Luna Bass",
    role: "Low-End Goddess",
    bio: "Serving heavy bass and heavier vibes. If it doesn't make you feel it in your chest, it's not loud enough.",
    avatar: "/api/placeholder/300/300",
    shows: ["Bass Cathedral", "Luna's Lair"],
    specialties: ["Dubstep", "Drum & Bass", "Future Bass"],
    socials: {
      instagram: "@lunabass",
      twitter: "@bass_goddess",
    },
    schedule: "Thursdays 8-10pm",
    status: "offline",
    followers: "9.8k",
    badge: "goddess"
  },
  {
    id: 5,
    name: "Vinyl Vixen",
    role: "Analog Angel",
    bio: "Keeping the sacred art of vinyl alive. Every crackle tells a story, every skip is a feature.",
    avatar: "/api/placeholder/300/300",
    shows: ["Vinyl Vault", "Analog Archives"],
    specialties: ["Classic House", "Disco", "Rare Grooves"],
    socials: {
      instagram: "@vinylvixen",
      twitter: "@analog_angel",
    },
    schedule: "Sundays 6-8pm",
    status: "offline",
    followers: "11.5k",
    badge: "angel"
  },
  {
    id: 6,
    name: "Synth Sage",
    role: "Digital Shaman",
    bio: "Channeling frequencies from the digital realm. Each set is a journey through synthetic landscapes.",
    avatar: "/api/placeholder/300/300",
    shows: ["Synth Sanctuary", "Digital Dreams"],
    specialties: ["Synthwave", "Retrowave", "Cyberpunk"],
    socials: {
      instagram: "@synthsage",
      twitter: "@digital_shaman",
    },
    schedule: "Wednesdays 9-11pm",
    status: "offline",
    followers: "7.2k",
    badge: "shaman"
  }
];

const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case "resident": return Crown;
    case "energy": return Zap;
    case "oracle": return Star;
    case "goddess": return Heart;
    case "angel": return Music;
    case "shaman": return Calendar;
    default: return Star;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "live": return "text-red-500";
    case "upcoming": return "text-yellow-500";
    default: return "text-gray-500";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "live": return "LIVE NOW";
    case "upcoming": return "UP NEXT";
    default: return "OFFLINE";
  }
};

export default function HostsPage() {
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
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-hotpink via-hung to-hotpink bg-clip-text text-transparent">
                Meet the Crew
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                The voices behind the frequency. Each host brings their own flavor of filth to keep you moving.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>2 LIVE NOW</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>1 UP NEXT</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hosts Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hosts.map((host, index) => {
                const BadgeIcon = getBadgeIcon(host.badge);
                
                return (
                  <motion.div
                    key={host.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-hotpink/50 transition-all duration-300 overflow-hidden group-hover:shadow-2xl">
                      {/* Host Image & Status */}
                      <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-hotpink/20 to-hung/20 relative overflow-hidden">
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="absolute top-4 left-4 flex items-center space-x-2">
                            <BadgeIcon size={16} className="text-hotpink" />
                            <span className="text-xs font-semibold text-white bg-black/50 px-2 py-1 rounded-full">
                              {host.role}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className={`text-xs font-bold px-2 py-1 rounded-full bg-black/70 ${getStatusColor(host.status)}`}>
                              {getStatusText(host.status)}
                            </div>
                          </div>
                          <div className="absolute bottom-4 right-4 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                            {host.followers} followers
                          </div>
                        </div>
                      </div>

                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl text-hotpink mb-1">
                              {host.name}
                            </CardTitle>
                            <CardDescription className="text-gray-400 text-sm">
                              {host.schedule}
                            </CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="w-8 h-8">
                              <Instagram size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8">
                              <Twitter size={14} />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {host.bio}
                        </p>

                        {/* Shows */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2">Shows</h4>
                          <div className="flex flex-wrap gap-1">
                            {host.shows.map((show, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-hotpink/20 text-hotpink px-2 py-1 rounded-full"
                              >
                                {show}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Specialties */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2">Specialties</h4>
                          <div className="flex flex-wrap gap-1">
                            {host.specialties.map((specialty, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-hung/20 text-hung px-2 py-1 rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-4">
                          <Button 
                            variant={host.status === 'live' ? 'neon' : 'outline'} 
                            size="sm" 
                            className="flex-1"
                          >
                            {host.status === 'live' ? 'Listen Live' : 'View Profile'}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Heart size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Join the Crew CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-black">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-hotpink to-hung bg-clip-text text-transparent">
                Ready to join the frequency?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Think you&apos;ve got what it takes to move the masses? We&apos;re always looking for fresh voices.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="neon" size="lg">
                  Apply to Host
                </Button>
                <Button variant="glass" size="lg">
                  Submit Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}