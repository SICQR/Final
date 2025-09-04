"use client";
export default function Ticker({ items = [], speed = 28 }: { items?: string[]; speed?: number }) {
  const row = [...items, ...items];
  // ticker is fixed to top of viewport and should sit above the header
  return (
    <div className="ticker fixed top-0 left-0 right-0" style={{ height: 'var(--ticker-height)' }}>
      <div className="overflow-hidden border-b border-[var(--line)] bg-[var(--bg)] z-[60]" style={{ height: 'var(--ticker-height)' }}>
        <div className="ticker-track flex gap-8 items-center h-full px-4 text-xs uppercase tracking-wider" style={{ ['--speed' as any]: `${speed}s` }}>
        {row.map((t, i) => (
          <span key={i} className="whitespace-nowrap text-[var(--sub)]">{t}</span>
        ))}
        </div>
      </div>
    </div>
  );
}
