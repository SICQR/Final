export default function LoadingScreen() {
  return (
    <div
      className="flex flex-col items-center justify-center py-24"
      style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.3s, transform 0.3s' }}
    >
      <svg width={56} height={56} className="mb-6 animate-spin" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="#ff1981" strokeWidth="6" />
      </svg>
      <p className="opacity-70">Loading…</p>
    </div>
  );
}