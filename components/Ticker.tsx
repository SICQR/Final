"use client";

import React from 'react';

export default function Ticker() {
  return (
    <div className="ticker bg-hotpink text-black py-2 overflow-hidden fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto">
        <div className="flex animate-scroll whitespace-nowrap">
          <span className="inline-block px-8 font-semibold">
            🔴 LIVE: HOTMESS RADIO broadcasting now
          </span>
          <span className="inline-block px-8">
            New drops available in shop • RAW collection dropping soon
          </span>
          <span className="inline-block px-8">
            Join the affiliate program • Earn with every scan
          </span>
          <span className="inline-block px-8">
            #HNHMESS • #HOTMESSLDN • #HUNG
          </span>
          <span className="inline-block px-8">
            Aftercare not afterthought • Hand 'n' hand is the only way to land
          </span>
          {/* Duplicate for seamless scroll */}
          <span className="inline-block px-8 font-semibold">
            🔴 LIVE: HOTMESS RADIO broadcasting now
          </span>
          <span className="inline-block px-8">
            New drops available in shop • RAW collection dropping soon
          </span>
          <span className="inline-block px-8">
            Join the affiliate program • Earn with every scan
          </span>
          <span className="inline-block px-8">
            #HNHMESS • #HOTMESSLDN • #HUNG
          </span>
          <span className="inline-block px-8">
            Aftercare not afterthought • Hand 'n' hand is the only way to land
          </span>
        </div>
      </div>
    </div>
  );
}