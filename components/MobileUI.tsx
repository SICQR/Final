/**
 * Mobile UI Components for HOTMESS business suite
 * Advanced responsive design, mobile-first components, and touch-optimized interactions
 */

'use client';

import { useState, useEffect, useRef } from 'react';

// Mobile Navigation Component
export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-gray-900 rounded-lg border border-gray-800"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className="w-full h-0.5 bg-hotpink" />
          <div className="w-full h-0.5 bg-hotpink" />
          <div className="w-full h-0.5 bg-hotpink" />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black">
          <nav className="pt-20 px-6">
            <div className="space-y-6">
              {[
                { name: 'Radio', href: '/radio', emoji: '📻' },
                { name: 'Shop', href: '/shop', emoji: '🛍️' },
                { name: 'Affiliate', href: '/affiliate', emoji: '💰' },
                { name: 'About', href: '/about', emoji: '🔥' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-4 text-2xl font-heading font-bold text-white hover:text-hotpink transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

// Simplified Mobile Components
export function TouchCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`touch-none select-none ${className}`}>
      {children}
    </div>
  );
}

export function MobileProductGrid({ 
  products, 
  onProductClick 
}: { 
  products: Array<{ id: string; name: string; price: number; category: string }>; 
  onProductClick: (product: any) => void;
}) {
  const [visibleProducts, setVisibleProducts] = useState(6);

  const loadMore = () => {
    setVisibleProducts(prev => Math.min(prev + 6, products.length));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {products.slice(0, visibleProducts).map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors"
          >
            <div className="aspect-square bg-gray-800 flex items-center justify-center">
              <span className="text-4xl">🎵</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-400 mb-2">{product.category}</p>
              <p className="text-hotpink font-bold">£{product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {visibleProducts < products.length && (
        <button
          onClick={loadMore}
          className="w-full py-4 bg-gray-900 border border-gray-800 rounded-lg text-hotpink font-semibold hover:bg-gray-800 transition-colors"
        >
          Load More ({products.length - visibleProducts} remaining)
        </button>
      )}
    </div>
  );
}

export function MobileAudioPlayer({ 
  track, 
  isPlaying, 
  currentTime, 
  onPlayPause, 
  onSeek 
}: {
  track: { id: string; title: string; artist: string; duration: number };
  isPlaying: boolean;
  currentTime: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
}) {
  const progressRef = useRef<HTMLDivElement>(null);
  const progress = (currentTime / track.duration) * 100;

  const handleProgressClick = (e: React.MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      onSeek(percentage * track.duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
      {/* Progress Bar */}
      <div
        ref={progressRef}
        onClick={handleProgressClick}
        className="w-full h-1 bg-gray-700 rounded-full mb-4 cursor-pointer"
      >
        <div
          className="h-full bg-hotpink rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm truncate">{track.title}</h3>
          <p className="text-xs text-gray-400 truncate">{track.artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          
          <button
            onClick={onPlayPause}
            className="w-12 h-12 bg-hotpink rounded-full flex items-center justify-center hover:bg-hotpink/90 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <span className="text-xs text-gray-400">{formatTime(track.duration)}</span>
        </div>
      </div>
    </div>
  );
}

export function FloatingActionButton({ 
  onClick, 
  icon, 
  className = '' 
}: { 
  onClick: () => void; 
  icon: React.ReactNode; 
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-14 h-14 bg-hotpink rounded-full shadow-xl flex items-center justify-center z-40 hover:bg-hotpink/90 transition-colors ${className}`}
    >
      {icon}
    </button>
  );
}

export function MobileTabs({ 
  tabs, 
  activeTab, 
  onTabChange 
}: {
  tabs: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) {
  return (
    <div className="flex bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${
            activeTab === tab.id
              ? 'bg-hotpink text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

export function StickyHeader({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isSticky ? 'bg-gray-900/95 backdrop-blur' : 'bg-transparent'
      } ${className}`}
    >
      {children}
    </header>
  );
}

export function SafeAreaView({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`pb-safe-area-inset-bottom ${className}`}>
      {children}
    </div>
  );
}