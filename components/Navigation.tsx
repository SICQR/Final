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
        </div>
      </nav>
    </header>
  );
}