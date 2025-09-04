// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-white">
  {/* Header is provided globally in app/layout.tsx */}

      <section className="border-b border-neutral-800 bg-[radial-gradient(1200px_600px_at_80%_-20%,rgba(255,43,214,.25),transparent),radial-gradient(1200px_600px_at_0%_0%,rgba(68,255,224,.15),transparent)]">
        <div className="mx-auto max-w-[1200px] px-4 py-16">
          <h1 className="text-[clamp(40px,6vw,64px)] font-black leading-tight">London’s Filth Frequency</h1>
          <p className="text-neutral-300 max-w-[60ch]">24/7 radio. Fashion. Aftercare. Community. Come get messy — safely.</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/radio" className="rounded-full px-4 py-3 font-bold text-black" style={{background: "linear-gradient(135deg,#ff2bd6,#44ffe0)"}}>▶︎ Play Live</Link>
            <Link href="/radio" className="rounded-full px-4 py-3 border border-neutral-700">View Schedule</Link>
            <Link href="/shop" className="rounded-full px-4 py-3 border border-neutral-700">Shop the Drop</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4">
        <section className="grid gap-4 md:grid-cols-2 mt-6">
          <article className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-400">Now</div>
            <div className="font-bold">Wake the Mess</div>
            <div className="text-neutral-400 text-sm">09:00–11:00 • Maxx</div>
            <button className="mt-3 rounded-full px-3 py-2 font-bold text-black" style={{background: "linear-gradient(135deg,#ff2bd6,#44ffe0)"}}>Listen</button>
          </article>
          <article className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-400">Next</div>
            <div className="font-bold">Drive Time Mess</div>
            <div className="text-neutral-400 text-sm">17:00–19:00 • You + Guests</div>
          </article>
        </section>

        <section className="mt-8">
          <div className="text-xs uppercase tracking-wide text-neutral-400">Shows</div>
          <h2 className="font-bold mt-1 mb-3">Core Programming</h2>
          <div className="grid gap-4 auto-cols-[75%] md:auto-cols-[33%] grid-flow-col overflow-x-auto pb-2">
            {[
              {k:"Fri 19:00",t:"Dial-a-Daddy",d:"Call-ins, chaos, aftercare."},
              {k:"Sun 14:00",t:"Hand-in-Hand",d:"Safety, love, and lube."},
              {k:"Daily",t:"Wake the Mess",d:"High-energy mornings."},
            ].map((x,i)=>(
              <article key={i} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4">
                <div className="text-xs uppercase tracking-wide text-neutral-400">{x.k}</div>
                <div className="font-bold">{x.t}</div>
                <p className="text-neutral-400">{x.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-400">Shop</div>
            <h2 className="font-bold mt-1 mb-3">The Drop</h2>
            <p className="text-neutral-400">RAW / HUNG / HIGH — gear to move in.</p>
            <Link href="/shop" className="inline-block mt-3 rounded-full px-3 py-2 border border-neutral-700">Browse</Link>
          </div>
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-400">Records & Editorial</div>
            <h2 className="font-bold mt-1 mb-3">New & Noted</h2>
            <ul className="list-disc pl-5 text-neutral-400">
              <li>Fashion Music Weekly #07</li>
              <li>Queer Culture Now — panel</li>
              <li>Hotmess Talks: Aftercare</li>
            </ul>
          </div>
        </section>
      </div>

      <footer className="border-t border-neutral-800 mt-16 text-neutral-300">
        <div className="mx-auto max-w-[1200px] px-4 py-6 grid gap-4 md:grid-cols-4">
          <div><strong>HOTMESS</strong><p className="text-neutral-400">Bold. Filthy. Smart. Always with care.</p></div>
          <div><div className="text-xs uppercase tracking-wide text-neutral-400">Radio</div><Link href="/radio">Live</Link><br/><Link href="/radio#schedule">Schedule</Link></div>
          <div><div className="text-xs uppercase tracking-wide text-neutral-400">Shop</div><Link href="/shop">Collections</Link><br/><Link href="/care">Care</Link></div>
          <div><div className="text-xs uppercase tracking-wide text-neutral-400">Legal</div><Link href="/privacy">Privacy</Link><br/><Link href="/terms">Terms</Link></div>
        </div>
        <div className="mx-auto max-w-[1200px] px-4 py-3 border-t border-neutral-800 text-neutral-500">© HOTMESS — London</div>
      </footer>
    </main>
  );
}