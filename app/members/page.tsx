import Link from "next/link";
import styles from "./members.module.css";
import ConsentGate from "@/components/ConsentGate";
import { getMembersHero, urlFor } from "@/lib/sanity";
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { resolvePublicImage } from '@/lib/imageFallback'

export const metadata: Metadata = {
  title: "Members — HOTMESS London",
  description: "XXX Private Room — men-only, 18+. Verified on Telegram.",
};

export default async function MembersPage() {
  const dm = await draftMode();
  const preview = (dm as any)?.isEnabled === true;
  const hero = await getMembersHero(preview);

  return (
    <main className={styles.page} aria-label="Members landing">
      <section className={styles.hero}>
        <picture>
          <source
            media="(min-width:900px)"
            srcSet={
              hero?.imgDesk
                ? urlFor(hero.imgDesk, preview).width(1600).height(700).fit("crop").auto('format').url()
                : resolvePublicImage('/images/members-hero-wide.jpg')
            }
          />
          <img
            src={
              hero?.imgMob
                ? urlFor(hero.imgMob, preview).width(1080).height(1600).fit("crop").auto('format').url()
                : resolvePublicImage('/images/members-hero-vertical.jpg')
            }
            alt={hero?.headline ?? "Blurred editorial portrait with 'MEMBERS ONLY' overlay"}
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
