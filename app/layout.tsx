import Link from "next/link";

import SponsorshipTickerVertical from "@/components/SponsorshipTickerVertical";
import StickyRadioDrawer from "@/components/StickyRadioDrawer";

import { ReactNode } from "react";
import ClientLayout from "./client-layout";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body style={{ background:"#000", color:"#fff" }}>
        <header style={{ display:"flex", gap:16, padding:"12px 16px", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,.1)" }}>
          <Link href="/" style={{ fontWeight:900, letterSpacing:.5 }}>HOTMESS</Link>
          <nav style={{ display:"flex", gap:12 }}>
            <Link href="/shop">Shop</Link>
            <Link href="/radio">Radio</Link>
            <Link href="/members">Members</Link>
            <Link href="/affiliate">Affiliate</Link>
            <Link href="/care">Care</Link>
          </nav>
        </header>

        <main style={{ minHeight:"70vh", padding:"20px" }}>{children}</main>

        <footer style={{ borderTop:"1px solid rgba(255,255,255,.1)", padding:"16px", display:"grid", gap:8 }}>
          <small>Men-only, 18+. Consent-first.</small>
          <nav style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            <Link href="/about">About</Link>
            <Link href="/press">Press</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/privacy">Data & Privacy Hub</Link>
            <Link href="/legal/ugc">UGC/Moderation</Link>
            <Link href="/legal/abuse">Abuse Reporting</Link>
            <Link href="/legal/dmca">DMCA</Link>
            <Link href="/legal/age">Age Verification</Link>
            <Link href="/legal/sponsorships">Sponsorship Disclosures</Link>
            <Link href="/partners">Creator Onboarding</Link>
            <Link href="/integrations">Partner Integrations</Link>
            <Link href="/legal">Legal</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}