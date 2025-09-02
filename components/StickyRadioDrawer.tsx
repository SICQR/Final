"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModernAudioPlayer from "./ModernAudioPlayer";

export default function StickyRadioDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-0 top-1/2 z-50 -translate-y-1/2 flex flex-col items-start">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-hotpink text-white font-heading px-4 py-3 rounded-r-xl shadow-lg focus:outline-none"
        aria-label={open ? "Close Radio" : "Open Radio"}
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        {open ? "Close Radio" : "▶ Radio"}
      </button>
      {/* Sliding Drawer */}
      <AnimatePresence>
        {open && (
          <aside
            className="bg-black/95 border-l-4 border-hotpink shadow-2xl w-64 min-h-[320px] pt-6 px-5 flex flex-col items-center"
            style={{ borderTopLeftRadius: 12, borderBottomLeftRadius: 12, opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.3s, transform 0.3s' }}
          >
            <h2 className="font-heading text-2xl text-hotpink mb-2">HOTMESS RADIO</h2>
            <ModernAudioPlayer streamUrl="https://listen.radioking.com/radio/736103/stream/802454" />
            <div className="text-xs mt-4 text-center opacity-70">24/7 Stream</div>
            <div className="mt-3 text-xs text-white/70">
              <span className="font-semibold">Now Playing:</span> <span className="text-hotpink">LIVE HOTMESS</span>
            </div>
          </aside>
        )}
      </AnimatePresence>
    </div>
  );
}