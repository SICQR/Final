"use client";
import useScrollDirection from "./useScrollDirection";
export default function RadioDock(){
  const dir = useScrollDirection();
  return (
    <div className={["fixed bottom-3 left-1/2 z-40 -translate-x-1/2 transition-transform", dir === "down" ? "translate-y-24" : "translate-y-0"].join(" ")}>
      <div className="rounded-full border border-[var(--line)] bg-[var(--card)]/90 backdrop-blur px-5 py-2">
        <button className="mr-3">▶︎</button>
        <span className="text-sm text-[var(--sub)]">HOTMESS LIVE</span>
      </div>
    </div>
  );
}
