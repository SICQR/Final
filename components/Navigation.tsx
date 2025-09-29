"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/auth";
import { 
  Menu, 
  X, 
  Radio, 
  ShoppingBag, 
  Users, 
  Calendar, 
  Crown, 
  Newspaper,
  MessageCircle,
  BarChart3,
  Settings,
  User
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: null },
  { href: "/radio", label: "Radio", icon: Radio },
  { href: "/hosts", label: "Hosts", icon: Users },
  { href: "/timetable", label: "Timetable", icon: Calendar },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/membership", label: "Membership", icon: Crown },
  { href: "/press", label: "Press", icon: Newspaper },
  { href: "/community", label: "Community", icon: MessageCircle },
];

const authItems = [
  { href: "/affiliate", label: "Affiliate", icon: BarChart3 },
  { href: "/admin", label: "Admin", icon: Settings },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-black/90 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-heading font-bold bg-gradient-to-r from-hotpink to-hung bg-clip-text text-transparent"
            >
              HOTMESS
            </motion.div>
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-hotpink to-hung group-hover:w-full transition-all duration-300"
              layoutId="logo-underline"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href} className="relative group">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-hotpink bg-hotpink/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-hotpink rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth & Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'affiliate' && (
                  <Link href="/affiliate">
                    <Button variant="ghost" size="sm">
                      <BarChart3 size={16} className="mr-2" />
                      Affiliate
                    </Button>
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm">
                      <Settings size={16} className="mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  <User size={16} className="mr-2" />
                  {user?.name}
                </Button>
              </>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-800"
            >
              <div className="flex flex-col space-y-2 pt-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? "text-hotpink bg-hotpink/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {Icon && <Icon size={20} />}
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Mobile Auth */}
                <div className="pt-4 border-t border-gray-800 mt-4">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-400">
                        Welcome, {user?.name}
                      </div>
                      {authItems.map((item, index) => {
                        if (
                          (item.href === '/affiliate' && user?.role !== 'affiliate') ||
                          (item.href === '/admin' && user?.role !== 'admin')
                        ) return null;
                        
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (navItems.length + index) * 0.1 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                            >
                              <Icon size={20} />
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          </motion.div>
                        );
                      })}
                      <Button
                        variant="ghost"
                        className="w-full justify-start mt-2"
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}