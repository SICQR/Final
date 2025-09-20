import Link from "next/link";

export default function Navigation() {
  return (
    <header className="border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-bold text-hotpink">
          HOTMESS
        </Link>
        <div className="flex items-center space-x-6">
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
          <div className="ml-4 text-xs text-gray-500 hidden lg:flex items-center space-x-2">
            <kbd className="px-1 py-0.5 bg-gray-800 rounded text-hotpink">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-1 py-0.5 bg-gray-800 rounded text-hotpink">K</kbd>
            <span className="ml-1">for commands</span>
          </div>
        </div>
      </nav>
    </header>
  );
}