"use client";
import { useState } from "react";
import Link from "next/link";
import { NAV } from "@/lib/constants";

export default function MobileNav(){
  const [open, setOpen] = useState(false);
  return (
    <>
      <button aria-label="Menu" onClick={()=>setOpen(true)} className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded bg-white/10">≡</button>
      <div className={`fixed inset-0 z-50 transition ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={()=>setOpen(false)}>
        <div className="absolute inset-0 bg-black/60" />
        <aside className={`absolute right-0 top-0 h-full w-[78%] max-w-sm bg-[var(--bg)] border-l border-[var(--line)] p-6 overflow-y-auto transition ${open ? "translate-x-0" : "translate-x-full"}`} onClick={e=>e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <span className="font-black tracking-[0.18em]">HOTMESS</span>
            <button onClick={()=>setOpen(false)} className="h-9 w-9 rounded bg-white/10">✕</button>
          </div>
          <nav className="space-y-6">
            {NAV.map(s => (
              <div key={s.label}>
                <Link href={s.href} className="block text-lg font-semibold mb-2">{s.label}</Link>
                {!!s.items?.length && (
                  <ul className="ml-3 space-y-2">
                    {s.items.map(it=> (
                      <li key={it.href}><Link href={it.href} className="text-sm text-[var(--sub)] hover:text-[var(--brand-acid)]">{it.label}</Link></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
