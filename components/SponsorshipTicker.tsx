"use client";
import { useEffect, useRef } from "react";

export default function SponsorshipTicker() {
  // No animation needed for vertical, just loop the text vertically
  return (
    <div className="fixed left-0 top-1/2 z-50 -translate-y-1/2 flex flex-col items-center pointer-events-none" style={{height: '220px'}}>
      <div className="bg-hung/80 text-black font-heading font-bold text-lg tracking-wider rounded-r-2xl px-2 py-1 flex flex-col items-center border-t-2 border-b-2 border-hotpink shadow-xl" style={{writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.05em', height: '200px'}}>
        <span className="text-hotpink">SPONSORED BY HNHMESS</span>
      </div>
    </div>
  );
}