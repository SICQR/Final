"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { 
  Newspaper, 
  Download, 
  ExternalLink,
  Calendar,
  User,
  Mail,
  FileText,
  Image as ImageIcon,
  Video,
  Headphones,
  Award,
  Quote,
  ArrowRight,
  Search,
  Filter
} from "lucide-react";

const pressReleases = [
  {
    id: 1,
    title: "HOTMESS London Launches Revolutionary Queer Radio Platform",
    excerpt: "New digital platform combines live radio streaming with e-commerce and community features, setting new standard for inclusive broadcasting.",
    date: "2024-11-15",
    category: "Launch",
    readTime: "3 min read",
    featured: true,
    downloadUrl: "/press/hotmess-launch-release.pdf"
  },
  {
    id: 2,
    title: "HOTMESS Announces Partnership with Leading LGBTQ+ Venues",
    excerpt: "Strategic partnerships bring exclusive live events and aftercare support to London's queer nightlife scene.",
    date: "2024-10-28",
    category: "Partnership",
    readTime: "2 min read",
    featured: false,
    downloadUrl: "/press/partnership-announcement.pdf"
  },
  {
    id: 3,
    title: "Innovative Aftercare Program Wins Community Impact Award",
    excerpt: "HNHMESS initiative recognized for pioneering approach to mental health support in nightlife industry.",
    date: "2024-10-15",
    category: "Award",
    readTime: "4 min read",
    featured: true,
    downloadUrl: "/press/award-recognition.pdf"
  },
  {
    id: 4,
    title: "HOTMESS Secures Series A Funding for Platform Expansion",
    excerpt: "£2.5M investment round led by inclusive tech fund to accelerate growth and international expansion.",
    date: "2024-09-30",
    category: "Funding",
    readTime: "3 min read",
    featured: false,
    downloadUrl: "/press/series-a-announcement.pdf"
  }
];

const mediaAssets = [
  {
    type: "logo",
    title: "HOTMESS Logo Package",
    description: "High-resolution logos in various formats and orientations",
    formats: ["PNG", "SVG", "EPS"],
    downloadUrl: "/media/hotmess-logo-package.zip"
  },
  {
    type: "images",
    title: "Host Photography",
    description: "Professional photos of HOTMESS radio hosts and team",
    formats: ["JPG", "PNG"],
    downloadUrl: "/media/host-photography.zip"
  },
  {
    type: "audio",
    title: "Station Jingles & IDs",
    description: "Audio branding elements and station identification clips",
    formats: ["MP3", "WAV"],
    downloadUrl: "/media/audio-branding.zip"
  },
  {
    type: "video",
    title: "Promotional Videos",
    description: "Brand videos, commercials, and behind-the-scenes content",
    formats: ["MP4", "MOV"],
    downloadUrl: "/media/promotional-videos.zip"
  }
];

const awards = [
  {
    year: "2024",
    title: "Community Impact Award",
    organization: "London Digital Media Awards",
    description: "Recognized for innovative aftercare program in nightlife industry"
  },
  {
    year: "2024",
    title: "Best New Radio Platform",
    organization: "UK Radio Awards",
    description: "Excellence in digital broadcasting and community engagement"
  },
  {
    year: "2024",
    title: "LGBTQ+ Business of the Year",
    organization: "Pride in London Business Awards",
    description: "Outstanding contribution to queer community and business innovation"
  }
];

const testimonials = [
  {
    quote: "HOTMESS has revolutionized how we think about queer media and community building. Their approach to combining entertainment with genuine care is unprecedented.",
    author: "Sarah Chen",
    role: "Editor, LGBTQ+ Media Collective",
    company: "Spectrum Magazine"
  },
  {
    quote: "The aftercare program isn't just innovative—it's life-changing. HOTMESS understands that nightlife should be safe, inclusive, and healing.",
    author: "Marcus Rodriguez",
    role: "Nightlife Safety Advocate",
    company: "Safe Spaces Initiative"
  },
  {
    quote: "From a business perspective, HOTMESS has created something truly unique. They've built a sustainable model that prioritizes community without sacrificing growth.",
    author: "Alex Thompson",
    role: "Tech Investor",
    company: "Forward Ventures"
  }
];

export default function PressPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Launch', 'Partnership', 'Award', 'Funding'];

  const filteredReleases = pressReleases.filter(release => {
    const matchesCategory = selectedCategory === 'All' || release.category === selectedCategory;
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                <Newspaper className="text-black ml-3" size={20} />
                <span className="text-black font-semibold mr-3">PRESS CENTER</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-hotpink via-hung to-hotpink bg-clip-text text-transparent">
                Press & Media
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Get the latest news, press releases, and media assets from HOTMESS London. 
                For press inquiries and interview requests, contact our media team.
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Button variant="neon" size="lg">
                  <Mail className="mr-2" size={16} />
                  Press Inquiries
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2" size={16} />
                  Media Kit
                </Button>
              </div>

              <p className="text-sm text-gray-400">
                Media contact: press@hotmessldn.com • Response within 24 hours
              </p>
            </motion.div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                Latest News & Releases
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Stay updated with HOTMESS developments, partnerships, and industry recognition
              </p>
            </motion.div>

            {/* Search & Filter */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search press releases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "neon" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Press Releases Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredReleases.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className={`h-full transition-all duration-300 overflow-hidden ${
                    release.featured
                      ? 'border-hotpink bg-gradient-to-br from-hotpink/10 to-hung/10 shadow-xl'
                      : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            release.category === 'Launch' ? 'bg-green-500/20 text-green-400' :
                            release.category === 'Award' ? 'bg-yellow-500/20 text-yellow-400' :
                            release.category === 'Funding' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-purple-500/20 text-purple-400'
                          }`}>
                            {release.category}
                          </span>
                          {release.featured && (
                            <span className="text-xs bg-hotpink/20 text-hotpink px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-400 space-x-4">
                          <span className="flex items-center space-x-1">
                            <Calendar size={12} />
                            <span>{new Date(release.date).toLocaleDateString()}</span>
                          </span>
                          <span>{release.readTime}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl group-hover:text-hotpink transition-colors">
                        {release.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-300 leading-relaxed">
                        {release.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4">
                        <Button variant="ghost" size="sm" className="group/btn">
                          Read More
                          <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={14} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2" size={14} />
                          PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Assets */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                Media Assets
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                High-quality assets for editorial use. All materials are available for download by accredited media.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaAssets.map((asset, index) => {
                const IconComponent = asset.type === 'logo' ? ImageIcon :
                                    asset.type === 'images' ? ImageIcon :
                                    asset.type === 'audio' ? Headphones :
                                    Video;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full bg-gray-900/30 border-gray-800 hover:border-hotpink/30 transition-all duration-300">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-hotpink to-hung flex items-center justify-center">
                          <IconComponent size={24} className="text-white" />
                        </div>
                        <CardTitle className="text-lg text-white">
                          {asset.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {asset.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {asset.formats.map((format, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                            >
                              {format}
                            </span>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="mr-2" size={14} />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 bg-gradient-to-r from-luxury-gold to-luxury-silver bg-clip-text text-transparent">
                Awards & Recognition
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                HOTMESS has been recognized by industry leaders for innovation, community impact, and business excellence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-full bg-gradient-to-br from-luxury-gold/10 to-luxury-silver/10 border-luxury-gold/30 hover:border-luxury-gold/50 transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-silver flex items-center justify-center">
                        <Award size={32} className="text-black" />
                      </div>
                      <div className="text-luxury-gold font-bold text-lg mb-2">{award.year}</div>
                      <CardTitle className="text-white mb-2">{award.title}</CardTitle>
                      <CardDescription className="text-luxury-silver font-medium">
                        {award.organization}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-center">
                        {award.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                What People Are Saying
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Industry leaders and community voices on HOTMESS&apos;s impact
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-gray-900/30 border-gray-800 hover:border-hotpink/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <Quote className="text-hotpink mb-4" size={32} />
                      <p className="text-gray-300 italic mb-6 leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="border-t border-gray-800 pt-4">
                        <p className="text-white font-semibold">{testimonial.author}</p>
                        <p className="text-hotpink text-sm">{testimonial.role}</p>
                        <p className="text-gray-400 text-sm">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-hotpink via-hung to-hotpink">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-black mb-6">
                Ready to tell our story?
              </h2>
              <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
                Get in touch with our press team for interviews, quotes, and exclusive access
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="ghost" size="xl" className="bg-black text-white hover:bg-black/80">
                  <Mail className="mr-2" size={20} />
                  press@hotmessldn.com
                </Button>
                <Button variant="ghost" size="xl" className="text-black border-black hover:bg-black hover:text-white">
                  <Download className="mr-2" size={20} />
                  Download Media Kit
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}