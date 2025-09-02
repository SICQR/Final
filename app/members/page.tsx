"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./members.module.css";
import ConsentGate from "@/components/ConsentGate";
import { getMembersHero, urlFor } from "@/lib/sanity";

export default function MembersPage() {
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHero() {
      try {
        const heroData = await getMembersHero();
        setHero(heroData);
      } catch (error) {
        console.warn("Could not fetch members hero:", error);
        setHero({
          headline: "HOTMESS Members",
          subhead: "Exclusive access for verified members"
        });
      } finally {
        setLoading(false);
      }
    }
    fetchHero();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <main className={styles.page} aria-label="Members landing">
      <section className={styles.hero}>
        <picture>
          <source
            media="(min-width:900px)"
            srcSet={hero?.imgDesk ? urlFor(hero.imgDesk).width(1600).height(700).fit("crop").url() : "/images/members-hero-wide.jpg"}
          />
          <img
            src={hero?.imgMob ? urlFor(hero.imgMob).width(1080).height(1600).fit("crop").url() : "/images/members-hero-vertical.jpg"}
            alt="Blurred editorial portrait with 'MEMBERS ONLY' overlay"
            style={{ width: "100%", display: "block" }}
          />
        </picture>

        <div className={styles.overlay}>
          <h1>{hero?.headline ?? "XXX PRIVATE ROOM — MEMBERS ONLY"}</h1>
          <p className={styles.sub}>
            {hero?.subhead ?? "Men-only, 18+. Verified on Telegram. Respect or you’re out."}
          </p>
          <div className={styles.ctas}>
            <Link className={styles.btnPrimary} href={hero?.ctaPrimaryHref ?? "/api/auth/telegram/start"}>
              {hero?.ctaPrimaryLabel ?? "JOIN WITH TELEGRAM"}
            </Link>
            <Link className={styles.btnGhost} href={hero?.ctaSecondaryHref ?? "/members/xxx"}>
              {hero?.ctaSecondaryLabel ?? "ALREADY A MEMBER? ENTER"}
            </Link>
            <Link className={styles.btnGhost} href="/legal/ugc">READ THE RULES</Link>
          </div>
          <ul className={styles.chips} aria-label="Safety chips">
            <li>Encrypted</li><li>Consent-first</li><li>Zero leaks</li><li>Mods on duty</li>
          </ul>
        </div>
      </section>

      <section className={styles.teases} aria-label="What you get">
        <div className={styles.card}><h3>Early drops</h3><p>First dibs on RAW/HUNG/SUPERHUNG.</p></div>
        <div className={styles.card}><h3>Private streams</h3><p>After-hours cuts, members only.</p></div>
        <div className={styles.card}><h3>Better rates</h3><p>Affiliate tiers bump inside.</p></div>
      </section>

      <section className={styles.cross} aria-label="Cross promotion">
        <Link href="/shop" className={styles.crossCard}><h4>Shop members-only</h4><span>GRAB A DROP</span></Link>
        <Link href="/radio" className={styles.crossCard}><h4>Listen live</h4><span>PRESS PLAY</span></Link>
        <Link href="/affiliate" className={styles.crossCard}><h4>Boost earnings</h4><span>OWN YOUR LINK</span></Link>
      </section>

      <ConsentGate kind="entry" />
    </main>
  );
}
