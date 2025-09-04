"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import NavDropdown from "@/components/DropdownMenu";
import MobileNav from "@/components/MobileNav";
import { NAV } from "@/lib/constants";

/**
 * EXPLAIN-TO-COPILOT: Header scroll behavior and constraints
 * - Keep header height strictly fixed (h-14) so layout never shifts when the user scrolls.
 * - Animate only the interior content (translateY) to create a compacting illusion without
 *   changing the header element's measured height. This prevents cumulative layout shift
 *   and flicker on route transitions.
 * - Use anchored positioning (left-0 right-0) rather than relying on 100vw or w-full so
 *   the header doesn't trigger horizontal scroll when scrollbars appear or animations run.
 * - Small numeric threshold (Number(v) > 6) toggles the compact state; tweak if you want
 *   a faster/softer response.
 */
export default function Header() {
  const { scrollY } = useScroll() as any;
  const [scrolled, setScrolled] = useState(false);
  // useMotionValueEvent typing can be strict; accept any for the callback value
  useMotionValueEvent((scrollY as any), "change", (v: any) => {
    setScrolled(Number(v) > 6);
  });

  return (
  // place header below the fixed ticker (uses --ticker-height)
  <header className={`h-14 sticky left-0 right-0 z-50 ${scrolled ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)]' : 'bg-transparent border-b border-transparent'}`} style={{ top: 'var(--ticker-height)' }}>
      {/** cast motion to any to avoid strict motion typing on DOM props */}
      {(() => {
        const M = motion as any;
        return (
          <M.div
            className="h-14 px-4 md:px-6 flex items-center justify-between"
            animate={{ y: scrolled ? -8 : 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          >
            <Link href="/" className="font-extrabold text-xl text-[var(--accent)]">HOTMESS</Link>
            <nav className="hidden md:flex gap-8">
              {NAV.map(s=> <NavDropdown key={s.label} label={s.label} href={s.href} items={s.items} />)}
            </nav>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </M.div>
        );
      })()}
    </header>
  );
}