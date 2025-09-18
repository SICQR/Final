import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 px-4 bg-gray-950">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-heading font-bold text-hotpink block mb-4">
              HOTMESS
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Queer engine. Streamed. Scanned. Worn. Always too much, never enough.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-hotpink transition-colors">
                📷 IG
              </a>
              <a href="#" className="text-gray-400 hover:text-hung transition-colors">
                🐦 TW
              </a>
              <a href="#" className="text-gray-400 hover:text-hotpink transition-colors">
                💬 DC
              </a>
              <a href="#" className="text-gray-400 hover:text-hung transition-colors">
                📱 TG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/radio" className="text-gray-400 hover:text-hotpink transition-colors">
                  HOTMESS Radio
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-hung transition-colors">
                  Shop Drops
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-hotpink transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-400 hover:text-hung transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-400 hover:text-hotpink transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Support */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-gray-400 hover:text-hotpink transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-hung transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-hotpink transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-gray-400 hover:text-hung transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-hotpink transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Partner Access */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Access</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-hotpink transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-gray-400 hover:text-hung transition-colors">
                  Partner Portal
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hotpink transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hung transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-hotpink transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                <span className="text-hotpink font-semibold">#HNHMESS</span> •{" "}
                <span className="text-hung font-semibold">#HOTMESSLDN</span> •{" "}
                <span className="text-hotpink font-semibold">#HUNG</span>
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <p>&copy; 2024 HOTMESS London. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}