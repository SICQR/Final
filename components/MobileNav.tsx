import Link from "next/link";
import { useState } from "react";
import { NAV } from "@/lib/constants";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button aria-label="menu" onClick={() => setOpen(!open)} className="p-2">
        ☰
      </button>
      {open && (
        <div className="absolute right-4 top-14 bg-[var(--bg)] border border-[var(--line)] rounded shadow-lg py-2">
          {NAV.map((s) => (
            <Link key={s.label} href={s.href} className="block px-4 py-2">
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
