"use client";

import { SITE } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

export default function AudioDock() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(!!SITE.streamUrl); }, []);

  if (!ready) return null;

  return (
    <div className="fixed bottom-3 right-3 z-30 rounded-xl bg-black/80 p-3 text-white shadow-lg">
      <p className="mb-2 text-xs uppercase tracking-wide">HOTMESS Radio</p>
      <audio ref={ref} controls preload="none" src={SITE.streamUrl} className="w-64">
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}