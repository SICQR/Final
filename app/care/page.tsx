import PageHero from "@/components/PageHero";
import CrossPromo from "@/components/CrossPromo";

export default function CarePage() {
  return (
    <main>
      <PageHero
        title="AFTERCARE, NOT AFTERTHOUGHT."
        sub="Heavy, healthy, real. Information/services only — not medical advice."
      >
        <nav style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }} aria-label="Care CTAs">
          <a href="/care" style={{ background: "#FF5300", color: "#000", padding: "12px 16px", borderRadius: 12, fontWeight: 700, textDecoration: "none" }}>HAND ’N’ HAND SUNDAYS</a>
          <a href="/care" style={{ background: "rgba(255,255,255,.08)", color: "#fff", padding: "12px 16px", border: "1px solid rgba(255,255,255,.16)", borderRadius: 12, textDecoration: "none" }}>NEED A SOFT LANDING?</a>
          <a href="/care" style={{ background: "rgba(255,255,255,.08)", color: "#fff", padding: "12px 16px", border: "1px solid rgba(255,255,255,.16)", borderRadius: 12, textDecoration: "none" }}>GET SUPPORT</a>
        </nav>
        <div style={{ marginTop: 16, fontSize: 13, opacity: .75 }}>
          <strong>Care Disclaimer:</strong> Information/services only — not medical advice.
        </div>
      </PageHero>
      {/* TODO: Render resources grid via Sanity GROQ */}
      <CrossPromo />
    </main>
  );
}
