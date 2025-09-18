import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Login — HOTMESS",
  description: "Sign in to your HOTMESS account to access exclusive content and community features.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-hotpink">
              Welcome Back
            </h1>
            <p className="text-gray-300">
              Sign in to access your HOTMESS account
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <form className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-hotpink focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-hotpink focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 rounded focus:ring-hotpink focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <Link href="#" className="text-sm text-hotpink hover:text-hotpink/80">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full btn-primary py-3 text-lg"
              >
                Sign In
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full py-3 px-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors flex items-center justify-center">
                  <span className="mr-2">🔗</span>
                  <span>Google</span>
                </button>
                <button className="w-full py-3 px-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors flex items-center justify-center">
                  <span className="mr-2">📱</span>
                  <span>Discord</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-hotpink hover:text-hotpink/80 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Community Note */}
          <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-gray-800 text-center">
            <div className="text-4xl mb-4">🌈</div>
            <h3 className="text-lg font-semibold mb-2 text-hung">Join the Community</h3>
            <p className="text-gray-300 text-sm">
              Access exclusive content, connect with others, and get early access to events and drops.
            </p>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
            <p className="text-yellow-200 text-sm text-center">
              <strong>Demo Notice:</strong> This is a demo login form. Authentication is not yet functional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}