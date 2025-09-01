"use client";

import { useEffect, useState } from "react";
import { COOKIE_KEYS, isAgeVerified, setCookie } from "@/lib/cookies";

export default function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => { if (!isAgeVerified()) setOpen(true); }, []);

  if (!open) return null;

  const confirm = () => {
    setCookie(COOKIE_KEYS.age, "1", { days: 365, sameSite: "Lax" });
    setOpen(false);
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/80 text-white">
      <div className="w-[92%] max-w-md rounded-xl border border-white/20 bg-neutral-900 p-6 shadow-2xl">
        <h2 className="mb-2 text-xl font-semibold">18+ Content</h2>
        <p className="mb-4 text-sm">
          HOTMESS is a men-only, 18+ space. By entering you confirm you’re 18+ and agree to our{" "}
          <a className="underline" href="/legal">Terms & Privacy</a>.
        </p>
        <div className="flex gap-2">
          <button onClick={confirm} className="rounded-lg bg-white px-4 py-2 text-black">I am 18+</button>
          <a href="https://www.google.com" className="rounded-lg border border-white/40 px-4 py-2">Leave</a>
        </div>
      </div>
    </div>
  );
}