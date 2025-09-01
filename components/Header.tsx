import Link from "next/link";
import AppDropdownMenu from "@/components/DropdownMenu";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="font-heading text-3xl text-hotpink">HOTMESS</Link>
      <nav className="hidden md:flex gap-8">
        <Link href="/lookbook">Lookbook</Link>
        <Link href="/shop/search">Shop</Link>
        <Link href="/radio">Radio</Link>
        <Link href="/affiliate">Affiliate</Link>
        <Link href="/about">About</Link>
        <Link href="/legal">Legal</Link>
      </nav>
      <div className="md:hidden">
        <AppDropdownMenu items={[
          { label: "Lookbook", href: "/lookbook" },
          { label: "Shop", href: "/shop/search" },
          { label: "Radio", href: "/radio" },
          { label: "Affiliate", href: "/affiliate" },
          { label: "About", href: "/about" },
          { label: "Legal", href: "/legal" },
        ]} />
      </div>
    </header>
  );
}