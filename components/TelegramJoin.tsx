"use client";
import { useState } from "react";

export function TelegramJoin({ userId }: { userId: string }) {
  const [invite, setInvite] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <div className="mb-4" style={{ transition: 'all 0.3s' }}>
      <button
        className="btn"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          const r = await fetch("/api/tg/invite", { method: "POST" });
          const j = await r.json();
          setInvite(j.invite);
          setBusy(false);
        }}
      >
        {busy ? "Checking…" : "Join Telegram Lounge"}
      </button>
      {invite && (
        <div className="mt-2">
          <a href={invite} target="_blank" rel="noopener" className="link">Open Telegram Room</a>
        </div>
      )}
    </div>
  );
}