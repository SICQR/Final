"use client";

import { useEffect, useState } from "react";
import { COOKIE_KEYS, getCookie, setCookie } from "@/lib/cookies";

export default function ConsentBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const c = getCookie(COOKIE_KEYS.consent);
    if (!c) setShow(true);
  }, []);

  if (!show) return null;

  const acceptAll = () => {
    setCookie(COOKIE_KEYS.consent, "all", { days: 365, sameSite: "Lax" });
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 p-3 text-sm text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <p className="opacity-90">
          We use minimal cookies for essential functions. Analytics only with consent. See{" "}
          <a href="/legal" className="underline">Privacy</a>.
        </p>
        <div className="flex gap-2">
          <button onClick={acceptAll} className="rounded-md bg-white px-3 py-2 text-black">Accept</button>
          <a href="/data" className="rounded-md border border-white/40 px-3 py-2">Manage</a>
        </div>
      </div>
    </div>
  );
}