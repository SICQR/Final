"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { useAuthStore } from "@/lib/stores/auth";
import { 
  Crown, 
  Star, 
  Check, 
  X, 
  Zap,
  Heart,
  Music,
  Users,
  Gift,
  Calendar,
  Download,
  MessageCircle,
  Shield,
  Infinity,
  ArrowRight,
  Sparkles
} from "lucide-react";

const membershipTiers = [
  {
    id: 'basic',
    name: 'Basic Listener',
    price: 'Free',
    priceMonthly: 0,
    description: 'Get started with HOTMESS',
    color: 'gray',
    icon: Music,
    features: [
      { name: 'Live radio stream', included: true },
      { name: 'Basic chat access', included: true },
      { name: 'Mobile app', included: true },
      { name: 'Show notifications', included: false },
      { name: 'Ad-free listening', included: false },
      { name: 'Exclusive content', included: false },
      { name: 'Early show access', included: false },
      { name: 'Discord VIP', included: false },
      { name: 'Monthly merch', included: false },
      { name: 'Meet & greets', included: false },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '£9.99',
    priceMonthly: 9.99,
    description: 'Level up your listening experience',
    color: 'hotpink',
    icon: Star,
    popular: true,
    features: [
      { name: 'Live radio stream', included: true },
      { name: 'Basic chat access', included: true },
      { name: 'Mobile app', included: true },
      { name: 'Show notifications', included: true },
      { name: 'Ad-free listening', included: true },
      { name: 'Exclusive content', included: true },
      { name: 'Early show access', included: true },
      { name: 'Discord VIP', included: false },
      { name: 'Monthly merch', included: false },
      { name: 'Meet & greets', included: false },
    ]
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '£24.99',
    priceMonthly: 24.99,
    description: 'The ultimate HOTMESS experience',
    color: 'hung',
    icon: Crown,
    features: [
      { name: 'Live radio stream', included: true },
      { name: 'Basic chat access', included: true },
      { name: 'Mobile app', included: true },
      { name: 'Show notifications', included: true },
      { name: 'Ad-free listening', included: true },
      { name: 'Exclusive content', included: true },
      { name: 'Early show access', included: true },
      { name: 'Discord VIP', included: true },
      { name: 'Monthly merch', included: true },
      { name: 'Meet & greets', included: true },
    ]
  }
];

const exclusivePerks = [
  {
    icon: Download,
    title: 'Exclusive Downloads',
    description: 'High-quality downloads of live sets and exclusive tracks'
  },
  {
    icon: MessageCircle,
    title: 'Direct Host Access',
    description: 'Chat directly with hosts and get your requests prioritized'
  },
  {
    icon: Calendar,
    title: 'Early Access',
    description: 'Be the first to hear new shows and special events'
  },
  {
    icon: Gift,
    title: 'Monthly Surprises',
    description: 'Exclusive merch, stickers, and digital collectibles'
  },
  {
    icon: Users,
    title: 'VIP Community',
    description: 'Access to private Discord channels and events'
  },
  {
    icon: Shield,
    title: 'Ad-Free Experience',
    description: 'Uninterrupted listening across all platforms'
  }
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState('premium');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [email, setEmail] = useState('');
  const { isAuthenticated, user } = useAuthStore();

  const handleSubscribe = async (tierId: string) => {
    if (!isAuthenticated) {
      // Redirect to auth
      window.location.href = '/auth/login';
      return;
    }
    
    // Handle subscription logic here
    console.log(`Subscribing to ${tierId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-hotpink/10 via-black to-hung/10" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-hotpink/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-hung/5 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-hotpink to-hung p-1 rounded-full mb-6">
                <Crown className="text-black ml-3" size={20} />
                <span className="text-black font-semibold mr-3">VIP ACCESS</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-hotpink via-hung to-hotpink bg-clip-text text-transparent">
                Join the Room
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Unlock exclusive content, ad-free listening, and VIP access to the HOTMESS universe. 
                Because some frequencies are reserved for the chosen few.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center bg-gray-900/50 rounded-lg p-1 mb-8">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    billingPeriod === 'monthly'
                      ? 'bg-hotpink text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-2 rounded-md font-medium transition-all relative ${
                    billingPeriod === 'yearly'
                      ? 'bg-hung text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Yearly
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {membershipTiers.map((tier, index) => {
                const Icon = tier.icon;
                const isSelected = selectedTier === tier.id;
                const yearlyDiscount = billingPeriod === 'yearly' ? 0.8 : 1;
                const displayPrice = tier.priceMonthly * yearlyDiscount;
                
                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10 }}
                    className={`relative group ${tier.popular ? 'md:scale-105' : ''}`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-hotpink to-hung text-black text-sm font-bold px-4 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}
                    
                    <Card className={`h-full transition-all duration-300 overflow-hidden ${
                      tier.popular
                        ? 'border-hotpink bg-gradient-to-br from-hotpink/10 to-hung/10 shadow-2xl shadow-hotpink/20'
                        : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                    }`}>
                      <CardHeader className="text-center pb-8">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${
                          tier.color === 'hotpink' ? 'from-hotpink to-hotpink/60' :
                          tier.color === 'hung' ? 'from-hung to-hung/60' :
                          'from-gray-600 to-gray-400'
                        } flex items-center justify-center`}>
                          <Icon size={32} className="text-white" />
                        </div>
                        
                        <CardTitle className="text-2xl font-heading font-bold mb-2">
                          {tier.name}
                        </CardTitle>
                        
                        <div className="mb-4">
                          {tier.priceMonthly === 0 ? (
                            <div className="text-3xl font-bold text-gray-400">Free</div>
                          ) : (
                            <div className="space-y-1">
                              <div className="text-3xl font-bold text-white">
                                £{displayPrice.toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-400">
                                per {billingPeriod === 'yearly' ? 'month (billed yearly)' : 'month'}
                              </div>
                              {billingPeriod === 'yearly' && tier.priceMonthly > 0 && (
                                <div className="text-xs text-green-400">
                                  Save £{((tier.priceMonthly * 12) - (displayPrice * 12)).toFixed(2)}/year
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <CardDescription className="text-gray-300">
                          {tier.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Features List */}
                        <div className="space-y-3">
                          {tier.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-3"
                            >
                              {feature.included ? (
                                <Check size={16} className="text-green-400 flex-shrink-0" />
                              ) : (
                                <X size={16} className="text-gray-600 flex-shrink-0" />
                              )}
                              <span className={`text-sm ${
                                feature.included ? 'text-white' : 'text-gray-500'
                              }`}>
                                {feature.name}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Subscribe Button */}
                        <Button
                          onClick={() => handleSubscribe(tier.id)}
                          variant={tier.popular ? 'neon' : tier.id === 'basic' ? 'outline' : 'luxury'}
                          size="lg"
                          className="w-full group"
                          disabled={user?.membership === tier.id}
                        >
                          {user?.membership === tier.id ? (
                            <>
                              <Check className="mr-2" size={16} />
                              Current Plan
                            </>
                          ) : tier.id === 'basic' ? (
                            'Free Access'
                          ) : (
                            <>
                              <Crown className="mr-2" size={16} />
                              Subscribe Now
                              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                            </>
                          )}
                        </Button>

                        {tier.id !== 'basic' && (
                          <p className="text-xs text-gray-400 text-center">
                            Cancel anytime. No commitments.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Exclusive Perks */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-hotpink to-hung bg-clip-text text-transparent">
                Exclusive Perks
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Premium members get access to experiences money can&apos;t buy
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exclusivePerks.map((perk, index) => {
                const Icon = perk.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full bg-gray-900/30 border-gray-800 hover:border-hotpink/30 transition-all duration-300">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-hotpink to-hung flex items-center justify-center">
                          <Icon size={24} className="text-white" />
                        </div>
                        <CardTitle className="text-lg text-white mb-2">
                          {perk.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-center">
                          {perk.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 px-4 bg-gradient-to-r from-hotpink via-hung to-hotpink">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="mx-auto mb-6 text-black" size={48} />
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-black mb-6">
                Stay in the loop
              </h2>
              <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
                Get the latest on new shows, exclusive drops, and member-only events
              </p>
              
              <div className="max-w-md mx-auto flex space-x-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/90 border-black/20 text-black placeholder:text-black/60"
                />
                <Button variant="ghost" className="bg-black text-white hover:bg-black/80">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm text-black/60 mt-4">
                No spam, just the good stuff. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}