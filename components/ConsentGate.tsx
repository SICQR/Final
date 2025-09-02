"use client";
import { useState } from "react";
import Link from "next/link";

type Props = { kind: "entry" | "post" };

export default function ConsentGate({ kind }: Props) {
  const [open, setOpen] = useState(kind === "entry");
  const [agree, setAgree] = useState(false);

  if (!open) return null;
  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,.65)", backdropFilter:"blur(6px)",
      display:"grid", placeItems:"center", zIndex:50
    }}>
      <div style={{ background:"#0b0b0b", color:"#fff", padding:16, borderRadius:14,
                    border:"1px solid rgba(255,255,255,.12)", maxWidth:520 }}>
        <h3 style={{ margin:"0 0 6px" }}>{kind==="entry" ? "Consent & Respect" : "Post with Consent"}</h3>
        <p style={{ opacity:.9, margin:"0 0 10px" }}>
          {kind==="entry"
            ? "Men-only (18+). Explicit content ahead. Every share needs a yes. Break consent — you’re out."
            : "I own the rights or have explicit consent from everyone shown. No doxxing. No leaks."}
        </p>
        <label style={{ display:"flex", gap:8, alignItems:"center" }}>
          <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
          <span>I understand and agree.</span>
        </label>
        <div style={{ display:"flex", gap:10, marginTop:12 }}>
          <button disabled={!agree}
            onClick={()=>setOpen(false)}
            style={{ background:"#FF5300", color:"#000", fontWeight:800, border:"none",
                     padding:"10px 14px", borderRadius:12 }}>
            {kind==="entry" ? "I CONSENT" : "CONTINUE"}
          </button>
          <Link href="/care" style={{ color:"#fff", opacity:.9, textDecoration:"none",
            padding:"10px 14px", border:"1px solid rgba(255,255,255,.16)", borderRadius:12 }}>
            Not now
          </Link>
        </div>
        {kind==="entry" && (
          <p style={{ marginTop:10, fontSize:12, opacity:.75 }}>
            Aftercare, not afterthought. Information/services only — not medical advice. <Link href="/care">Go to Care</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
