import PageHero from "@/components/PageHero";
import CrossPromo from "@/components/CrossPromo";

export default function RecordsPage() {
  return (
    <main>
      <PageHero
        title="RAW CONVICT RECORDS"
        sub="Tracks born in sweat and grief, pressed for the boys still dancing."
      >
        <nav style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }} aria-label="Records CTAs">
          <a href="/records" style={{ background: "#FF5300", color: "#000", padding: "12px 16px", borderRadius: 12, fontWeight: 700, textDecoration: "none" }}>STREAM IT</a>
          <a href="/shop" style={{ background: "rgba(255,255,255,.08)", color: "#fff", padding: "12px 16px", border: "1px solid rgba(255,255,255,.16)", borderRadius: 12, textDecoration: "none" }}>BUY THE CAPSULE</a>
          <a href="/members" style={{ background: "rgba(255,255,255,.08)", color: "#fff", padding: "12px 16px", border: "1px solid rgba(255,255,255,.16)", borderRadius: 12, textDecoration: "none" }}>MEMBERS EXCLUSIVE CUTS</a>
        </nav>
      </PageHero>
      {/* TODO: Render releases carousel via Sanity GROQ */}
      <CrossPromo />
    </main>
  );
}
