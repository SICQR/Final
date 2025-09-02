export default function CrossPromo() {
  return (
    <section style={{ display: "grid", gap: 10, marginTop: 32 }} aria-label="Cross promotion">
      <a href="/shop" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "#fff", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16, padding: 14, background: "rgba(255,255,255,.03)" }}>
        <h4 style={{ margin: 0, fontWeight: 700 }}>Shop the drop</h4><span style={{ opacity: .8 }}>GRAB A SKU</span>
      </a>
      <a href="/radio" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "#fff", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16, padding: 14, background: "rgba(255,255,255,.03)" }}>
        <h4 style={{ margin: 0, fontWeight: 700 }}>Listen live</h4><span style={{ opacity: .8 }}>PRESS PLAY</span>
      </a>
      <a href="/affiliate" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "#fff", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16, padding: 14, background: "rgba(255,255,255,.03)" }}>
        <h4 style={{ margin: 0, fontWeight: 700 }}>Boost earnings</h4><span style={{ opacity: .8 }}>OWN YOUR LINK</span>
      </a>
    </section>
  );
}
