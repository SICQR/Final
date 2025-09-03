import Image from 'next/image'
import { LINES } from '@/lib/copy'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-10">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <Image
          src="/images/branding/logo-hotmess.svg"
          alt="Hotmess Logo"
          width={200}
          height={80}
        />
      </div>

      {/* Lookbook asset */}
      <div className="mb-8">
        <Image
          src="/images/lookbook/01-own-your-mess.jpg"
          alt="Own Your Mess"
          width={800}
          height={600}
          className="rounded-xl"
        />
      </div>

      {/* Brand copy */}
      <h1 className="text-4xl font-extrabold mb-4">{LINES.HAND_N_HAND}</h1>
      <p className="text-lg opacity-80 mb-8">
        Welcome to HOTMESS LONDON. Shop, listen, join, and own your mess.
      </p>

      {/* Link to shop */}
      <a href="/shop" className="inline-block px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-neutral-800">
        Shop Now
      </a>
    </main>
  )
}