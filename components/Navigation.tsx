'use client'

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-bold text-hotpink">
          HOTMESS
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/radio" className="hover:text-hotpink transition-colors">
            Radio
          </Link>
          <Link href="/shop" className="hover:text-hung transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-hotpink transition-colors">
            About
          </Link>
          <Link href="/affiliate" className="hover:text-hung transition-colors">
            Affiliate
          </Link>
          
          {status === 'loading' && (
            <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse"></div>
          )}
          
          {status === 'unauthenticated' && (
            <div className="flex items-center space-x-3">
              <Link href="/auth/signin" className="hover:text-hotpink transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn-primary text-sm py-2 px-4">
                Join the Room
              </Link>
            </div>
          )}
          
          {status === 'authenticated' && session?.user && (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 hover:text-hotpink transition-colors"
              >
                {session.user.image ? (
                  <Image 
                    src={session.user.image} 
                    alt="Profile" 
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-hotpink flex items-center justify-center text-black font-bold text-sm">
                    {session.user.name?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="hidden lg:block">{session.user.name || 'User'}</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50">
                  <div className="py-2">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 hover:bg-gray-800 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 hover:bg-gray-800 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <hr className="border-gray-800 my-2" />
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        signOut();
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors text-red-400"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-gray-800 z-50">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/radio" className="block hover:text-hotpink transition-colors">
                Radio
              </Link>
              <Link href="/shop" className="block hover:text-hung transition-colors">
                Shop
              </Link>
              <Link href="/about" className="block hover:text-hotpink transition-colors">
                About
              </Link>
              <Link href="/affiliate" className="block hover:text-hung transition-colors">
                Affiliate
              </Link>
              
              {status === 'unauthenticated' && (
                <div className="space-y-2 pt-4 border-t border-gray-800">
                  <Link href="/auth/signin" className="block hover:text-hotpink transition-colors">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="block btn-primary text-center">
                    Join the Room
                  </Link>
                </div>
              )}
              
              {status === 'authenticated' && (
                <div className="space-y-2 pt-4 border-t border-gray-800">
                  <Link href="/profile" className="block hover:text-hotpink transition-colors">
                    Profile
                  </Link>
                  <Link href="/dashboard" className="block hover:text-hotpink transition-colors">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block text-red-400 hover:text-red-300 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}