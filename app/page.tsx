"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useRadioStore } from "@/lib/stores/radio";
import { 
  Play, 
  Pause, 
  Radio, 
  ShoppingBag, 
  Crown, 
  Users, 
  BarChart3,
  Volume2,
  MapPin,
  Clock,
  Zap,
  Heart,
  Star,
  ArrowRight,
  Headphones
} from "lucide-react";

export default function HomePage() {
  const { isPlaying, setPlaying, currentShow, listeners, loadSchedule } = useRadioStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  const handlePlayToggle = () => {
    setPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 pt-20"
        style={{ y, opacity }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-hotpink/20 via-black to-hung/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.p 
              className="text-hotpink font-semibold mb-4 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Queer engine. Streamed. Scanned. Worn.
            </motion.p>
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-heading font-bold mb-6 bg-gradient-to-r from-white via-hotpink to-hung bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Always too much,{" "}
              <span className="block">never enough.</span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Shop limited drops, stream HOTMESS RADIO, and earn with every scan. 
            For the boys who stayed up, stayed soft, and still showed up. 
            HNHMESS: aftercare, not afterthought.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/radio">
              <Button variant="neon" size="lg" className="group">
                <Radio className="mr-2" size={20} />
                Listen Live
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="luxury" size="lg" className="group">
                <ShoppingBag className="mr-2" size={20} />
                Shop Drops
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Button>
            </Link>
            <Link href="/membership">
              <Button variant="glass" size="lg" className="group">
                <Crown className="mr-2" size={20} />
                Join the Room
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Button>
            </Link>
          </motion.div>

          {/* Floating Now Playing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="inline-block"
          >
            <Card className="bg-black/60 border border-hotpink/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePlayToggle}
                    className="w-12 h-12 rounded-full bg-hotpink hover:bg-hotpink/80 text-white"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </Button>
                  <div className="text-left">
                    <p className="font-semibold text-white">
                      {currentShow?.title || "HOTMESS RADIO"}
                    </p>
                    <p className="text-sm text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                      LIVE • {listeners} listeners
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-hotpink">
                    <Volume2 size={16} />
                    <Headphones size={16} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Sat Nav Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-hotpink to-hung bg-clip-text text-transparent">
              Navigate the Mess
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your satellite navigation through London&apos;s filthiest frequency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Radio,
                title: "HOTMESS RADIO",
                description: "London's Filth Frequency. Live now.",
                quote: "Press play, lover. We'll do the rest.",
                color: "hotpink",
                href: "/radio"
              },
              {
                icon: ShoppingBag,
                title: "Drops",
                description: "RAW / HUNG / HIGH / SUPER — limited, loud, lethal.",
                quote: "Wear the mess. Own the night.",
                color: "hung",
                href: "/shop"
              },
              {
                icon: Users,
                title: "Community",
                description: "Connect with the crew and find your tribe.",
                quote: "Hand 'n' hand is the only way to land.",
                color: "hotpink",
                href: "/community"
              },
              {
                icon: Heart,
                title: "Aftercare (HNHMESS)",
                description: "Because self-care is a revolutionary act.",
                quote: "Hydrate, breathe, check in.",
                color: "hung",
                href: "/membership"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link href={item.href}>
                    <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-hotpink/50 transition-all duration-300 cursor-pointer group-hover:shadow-2xl group-hover:bg-gray-800/50">
                      <CardHeader className="text-center pb-4">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-${item.color} to-${item.color}/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={32} className="text-white" />
                        </div>
                        <CardTitle className={`text-xl text-${item.color} mb-2`}>
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300 mb-4">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 text-center">
                        <p className={`text-sm italic text-${item.color === 'hotpink' ? 'hung' : 'hotpink'} group-hover:text-white transition-colors`}>
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Flywheel Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-luxury-gold to-luxury-silver bg-clip-text text-transparent">
              The Flywheel
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              How HOTMESS spins content, community, and commerce into pure energy
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-hotpink rounded-full flex items-center justify-center flex-shrink-0">
                  <Radio size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-hotpink">Content</h3>
                  <p className="text-gray-300">Radio shows, mixes, and exclusive content</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-hung rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-hung">Community</h3>
                  <p className="text-gray-300">Loyal listeners become brand ambassadors</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-luxury-gold">Commerce</h3>
                  <p className="text-gray-300">Exclusive drops and merchandise</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-64 h-64 border-2 border-hotpink/30 rounded-full relative"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-hotpink rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-hung rounded-full"></div>
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-luxury-gold rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neon-blue rounded-full"></div>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Zap size={48} className="text-hotpink mx-auto mb-2" />
                  <p className="font-heading text-lg font-bold text-white">ENERGY</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-neon-blue">Data</h3>
                  <p className="text-gray-300">Insights drive better content and targeting</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0">
                  <Star size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-neon-green">Growth</h3>
                  <p className="text-gray-300">Each cycle amplifies reach and revenue</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-purple rounded-full flex items-center justify-center flex-shrink-0">
                  <Crown size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-neon-purple">Premium</h3>
                  <p className="text-gray-300">VIP experiences for loyal community</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-hotpink via-hung to-hotpink">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-black mb-6">
              Ready to get messy?
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Join the frequency that moves through you. Stream, shop, earn, and connect.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/membership">
                <Button variant="glass" size="xl" className="text-black border-black hover:bg-black hover:text-white">
                  <Crown className="mr-2" size={20} />
                  Join VIP
                </Button>
              </Link>
              <Link href="/radio">
                <Button variant="ghost" size="xl" className="text-black hover:bg-black hover:text-white border-2 border-black">
                  <Radio className="mr-2" size={20} />
                  Listen Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 bg-black">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-heading text-xl font-bold text-hotpink mb-4">HOTMESS</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                London&apos;s filthiest frequency. Always too much, never enough.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/radio" className="block text-gray-400 hover:text-hotpink transition-colors text-sm">
                  Radio
                </Link>
                <Link href="/shop" className="block text-gray-400 hover:text-hotpink transition-colors text-sm">
                  Shop
                </Link>
                <Link href="/membership" className="block text-gray-400 hover:text-hotpink transition-colors text-sm">
                  Membership
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <div className="space-y-2">
                <Link href="/community" className="block text-gray-400 hover:text-hotpink transition-colors text-sm">
                  Telegram
                </Link>
                <Link href="/hosts" className="block text-gray-400 hover:text-hotpink transition-colors text-sm">
                  Hosts
                </Link>
                <Link href="/press" className="block text-gray-400 hover:text-hotpink transition-colors text-sm">
                  Press
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Business</h4>
              <div className="space-y-2">
                <Link href="/affiliate" className="block text-gray-400 hover:text-hotpink transition-colors text-sm">
                  Affiliate
                </Link>
                <Link href="/admin" className="block text-gray-400 hover:text-hotpink transition-colors text-sm">
                  Admin
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 mb-4">
              <span className="text-hotpink font-semibold">#HNHMESS</span> •{" "}
              <span className="text-hung font-semibold">#HOTMESSLDN</span> •{" "}
              <span className="text-hotpink font-semibold">#HUNG</span>
            </p>
            <p className="text-sm text-gray-500">
              © 2024 HOTMESS London. All rights reserved. • HOTMESSLDN.COM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}