export default function StickyActions() {
  return (
    <nav style={{ position: "sticky", bottom: 0, zIndex: 20, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, padding: 10, background: "rgba(0,0,0,.65)", backdropFilter: "blur(8px)" }} aria-label="Quick actions">
      <a href="/shop" style={{ background: "#FF5300", color: "#000", borderRadius: 12, textDecoration: "none", fontWeight: 700, display: "grid", placeItems: "center", height: 44 }}>Shop</a>
      <a href="/radio" style={{ background: "#111", color: "#fff", borderRadius: 12, textDecoration: "none", fontWeight: 700, display: "grid", placeItems: "center", height: 44, border: "1px solid rgba(255,255,255,.12)" }}>Listen</a>
      <a href="/members" style={{ background: "#111", color: "#fff", borderRadius: 12, textDecoration: "none", fontWeight: 700, display: "grid", placeItems: "center", height: 44, border: "1px solid rgba(255,255,255,.12)" }}>Members</a>
      <a href="/affiliate" style={{ background: "#111", color: "#fff", borderRadius: 12, textDecoration: "none", fontWeight: 700, display: "grid", placeItems: "center", height: 44, border: "1px solid rgba(255,255,255,.12)" }}>Affiliate</a>
      <a href="/care" style={{ background: "#111", color: "#fff", borderRadius: 12, textDecoration: "none", fontWeight: 700, display: "grid", placeItems: "center", height: 44, border: "1px solid rgba(255,255,255,.12)" }}>Care</a>
    </nav>
  );
}
