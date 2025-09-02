export default function PlayerDock() {
  return (
    <aside style={{ position: "fixed", left: 12, right: 12, bottom: 68, display: "grid", gridTemplateColumns: "44px 1fr auto", gap: 12, alignItems: "center", padding: "10px 12px", borderRadius: 14, background: "#0b0b0b", color: "#fff", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 6px 24px rgba(0,0,0,.45)" }} aria-label="Radio player">
      <button style={{ width: 44, height: 44, borderRadius: "50%", border: "none", background: "#FF5300", color: "#000", fontWeight: 900 }} aria-label="Play">►</button>
      <div style={{ display: "grid", lineHeight: 1.1 }}>
        <strong style={{ fontSize: 12, opacity: .9 }}>HOTMESS RADIO</strong>
        <span style={{ fontSize: 12, opacity: .7 }}>Filth Frequency — Live</span>
      </div>
      <a href="/radio" style={{ textDecoration: "none", fontWeight: 700, color: "#fff", opacity: .9 }}>Open</a>
    </aside>
  );
}
