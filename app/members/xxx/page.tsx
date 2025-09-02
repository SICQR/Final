import styles from "../members.module.css";
import Link from "next/link";
import ConsentGate from "@/components/ConsentGate";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const metadata = { title: "XXX Room — Members", description: "Private room for verified members." };

export default async function XXXRoom() {
  const session = await getSession();
  if (!session || !["member","mod","creator"].includes(session.role)) {
    redirect("/members?reason=not_verified");
  }

  return (
    <main className={styles.room} aria-label="XXX Private Room">
      <header className={styles.roomHeader}>
        <span className={styles.live}>LIVE</span>
        <nav className={styles.roomNav}>
          <Link href="/legal/ugc">RULES</Link>
          <Link href="/legal/abuse">REPORT</Link>
          <Link href="/legal/dmca">DMCA</Link>
        </nav>
      </header>

      <section className={styles.playerBlock}>
        <h2>Members Cut — On Air</h2>
        <div className={styles.playerMock}>[ Private Player Embed ]</div>
        <div className={styles.roomActions}>
          <Link href="/radio" className={styles.btnGhost}>TUNE RADIO</Link>
          <Link href="/shop" className={styles.btnGhost}>SHOP DROP</Link>
          <Link href="/affiliate" className={styles.btnGhost}>GET AFFILIATE LINK</Link>
          <Link href="/care" className={styles.btnGhost}>CARE</Link>
        </div>
      </section>

      <section className={styles.teaser}>
        <h3>Early drop: RAW</h3>
        <p>Members get it first. No restocks.</p>
        <Link className={styles.btnPrimary} href="/shop">ADD TO BAG</Link>
      </section>

      <section className={styles.feed} aria-label="Member feed">
        <article className={styles.postComposer}>
          <h4>Post (consent required)</h4>
          <ConsentGate kind="post" />
          <div className={styles.postBox}>[ Upload or drop media ]</div>
          <button className={styles.btnPrimary}>POST</button>
        </article>
      </section>
    </main>
  );
}
