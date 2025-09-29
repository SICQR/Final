"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { useAuthStore } from "@/lib/stores/auth";
import { 
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  Facebook,
  MessageCircle,
  User,
  UserPlus,
  ArrowRight,
  Shield,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, loginWithGoogle, loginWithFacebook, loginWithTelegram } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        // Handle signup
        await login(email, password); // Mock signup as login for now
      }
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'telegram') => {
    setIsLoading(true);
    try {
      switch (provider) {
        case 'google':
          await loginWithGoogle();
          break;
        case 'facebook':
          await loginWithFacebook();
          break;
        case 'telegram':
          await loginWithTelegram();
          break;
      }
      router.push('/');
    } catch (err) {
      setError('Social login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-hotpink to-hung p-1 rounded-full mb-6">
              <User className="text-black ml-3" size={20} />
              <span className="text-black font-semibold mr-3">
                {isLogin ? 'SIGN IN' : 'JOIN US'}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 bg-gradient-to-r from-hotpink via-hung to-hotpink bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back' : 'Join the Frequency'}
            </h1>
            <p className="text-gray-300">
              {isLogin 
                ? 'Sign in to access your account and premium features'
                : 'Create an account to unlock exclusive content and community access'
              }
            </p>
          </motion.div>

          {/* Auth Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-white">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {isLogin 
                    ? 'Enter your credentials to access your account'
                    : 'Fill in your details to get started'
                  }
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Social Login */}
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="flex items-center justify-center"
                  >
                    <Chrome size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={isLoading}
                    className="flex items-center justify-center"
                  >
                    <Facebook size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSocialLogin('telegram')}
                    disabled={isLoading}
                    className="flex items-center justify-center"
                  >
                    <MessageCircle size={16} />
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">or continue with email</span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4 text-hotpink bg-gray-800 border-gray-600 rounded focus:ring-hotpink" />
                        <span className="text-sm text-gray-400">Remember me</span>
                      </label>
                      <Link href="/auth/forgot-password" className="text-sm text-hotpink hover:text-hotpink/80">
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="neon"
                    size="lg"
                    className="w-full group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      <>
                        {isLogin ? (
                          <>
                            <User className="mr-2" size={16} />
                            Sign In
                          </>
                        ) : (
                          <>
                            <UserPlus className="mr-2" size={16} />
                            Create Account
                          </>
                        )}
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </>
                    )}
                  </Button>
                </form>

                {/* Terms for signup */}
                {!isLogin && (
                  <div className="text-xs text-gray-400 text-center">
                    By creating an account, you agree to our{' '}
                    <Link href="/legal/terms" className="text-hotpink hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/legal/privacy" className="text-hotpink hover:underline">
                      Privacy Policy
                    </Link>
                  </div>
                )}

                {/* Toggle between login/signup */}
                <div className="text-center">
                  <span className="text-gray-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                      setEmail('');
                      setPassword('');
                      setConfirmPassword('');
                      setName('');
                    }}
                    className="text-hotpink hover:text-hotpink/80 font-medium"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits */}
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <Card className="bg-gray-900/30 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-4 flex items-center">
                    <Sparkles className="mr-2 text-hotpink" size={16} />
                    Member Benefits
                  </h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Shield size={14} className="text-green-400" />
                      <span>Access to exclusive content and early releases</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield size={14} className="text-green-400" />
                      <span>Join VIP community channels and events</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield size={14} className="text-green-400" />
                      <span>Personalized recommendations and playlists</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield size={14} className="text-green-400" />
                      <span>Priority support and direct host access</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}