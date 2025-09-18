import Link from "next/link";

export default function Navigation() {
  return (
    <header className="border-b border-gray-800" role="banner">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between" role="navigation" aria-label="Main navigation">
        <Link 
          href="/" 
          className="text-2xl font-heading font-bold text-hotpink"
          aria-label="HOTMESS Home"
        >
          HOTMESS
        </Link>
        <div className="flex items-center space-x-6">
          <Link 
            href="/radio" 
            className="hover:text-hotpink transition-colors"
            aria-label="HOTMESS Radio - London's Filth Frequency"
          >
            Radio
          </Link>
          <Link 
            href="/shop" 
            className="hover:text-hung transition-colors"
            aria-label="Shop Drops - Limited edition clothing"
          >
            Shop
          </Link>
          <Link 
            href="/events" 
            className="hover:text-hotpink transition-colors"
            aria-label="Events - Community gatherings and shows"
          >
            Events
          </Link>
          <Link 
            href="/community" 
            className="hover:text-hung transition-colors"
            aria-label="Community - Connect and share with others"
          >
            Community
          </Link>
          <Link 
            href="/partners" 
            className="hover:text-hotpink transition-colors"
            aria-label="Partners - Our brand collaborations"
          >
            Partners
          </Link>
          <Link 
            href="/about" 
            className="hover:text-hung transition-colors"
            aria-label="About HOTMESS - Our story and mission"
          >
            About
          </Link>
          <Link 
            href="/affiliate" 
            className="hover:text-hotpink transition-colors"
            aria-label="Affiliate Program - Earn with your referrals"
          >
            Affiliate
          </Link>
          <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-700" role="group" aria-label="User account actions">
            <Link 
              href="/login" 
              className="text-sm hover:text-hotpink transition-colors"
              aria-label="Sign in to your account"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="btn-primary text-sm py-2 px-4"
              aria-label="Create a new account"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}