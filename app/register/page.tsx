import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Register — HOTMESS",
  description: "Join the HOTMESS community. Create your account to access exclusive content and connect with others.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-hotpink">
              Join HOTMESS
            </h1>
            <p className="text-gray-300">
              Create your account and become part of the community
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <form className="space-y-6">
              {/* Display Name Field */}
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-hotpink focus:outline-none transition-colors"
                  placeholder="How should we call you?"
                />
                <p className="mt-1 text-xs text-gray-400">
                  This will be visible to other community members
                </p>
              </div>

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
                <p className="mt-1 text-xs text-gray-400">
                  Must be at least 8 characters with mixed case, numbers, and symbols
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-hotpink focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {/* Age Verification */}
              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 rounded focus:ring-hotpink focus:ring-2 mt-1"
                  />
                  <span className="ml-3 text-sm text-gray-300">
                    I confirm that I am 18 years or older
                  </span>
                </label>
              </div>

              {/* Terms and Privacy */}
              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 rounded focus:ring-hotpink focus:ring-2 mt-1"
                  />
                  <span className="ml-3 text-sm text-gray-300">
                    I agree to the{" "}
                    <Link href="#" className="text-hotpink hover:text-hotpink/80">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-hotpink hover:text-hotpink/80">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Marketing Opt-in */}
              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-hotpink bg-gray-800 border-gray-700 rounded focus:ring-hotpink focus:ring-2 mt-1"
                  />
                  <span className="ml-3 text-sm text-gray-300">
                    I'd like to receive updates about events, drops, and community news
                  </span>
                </label>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                className="w-full btn-primary py-3 text-lg"
              >
                Create Account
              </button>
            </form>

            {/* Social Registration */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or sign up with</span>
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

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-hotpink hover:text-hotpink/80 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-gray-800 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold mb-2 text-hung">Welcome to HOTMESS</h3>
            <p className="text-gray-300 text-sm">
              Join our community of creators, dreamers, and supporters. Connect with others who get it.
            </p>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
            <p className="text-yellow-200 text-sm text-center">
              <strong>Demo Notice:</strong> This is a demo registration form. Account creation is not yet functional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}