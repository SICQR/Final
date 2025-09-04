"use client";
import { useState } from "react";
import Link from "next/link";

export default function NavDropdown({ label, items, href }:{ label:string; href:string; items?:{label:string; href:string}[] }){
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <Link href={href} className="px-2 py-1 hover:text-[var(--brand-acid)]">{label}</Link>
      {!!items?.length && (
        <div className={`absolute left-0 top-full mt-2 min-w-[220px] rounded-xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg),white 4%)] shadow-lg backdrop-blur transition-all ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
          <ul className="py-2">
            {items.map((it)=> (
              <li key={it.href}>
                <Link href={it.href} className="block px-4 py-2 text-sm hover:text-[var(--brand-acid)] hover:bg-white/5">{it.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
// keep a single default export (NavDropdown) — no extra wrapper here
