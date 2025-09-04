import type { Metadata } from "next";
import ModernAudioPlayer from "@/components/ModernAudioPlayer";
import { STREAM_URL } from "@/lib/constants";
import { getNowNext } from "@/lib/nowNext";
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const metadata: Metadata = {
  title: "The Filth Frequency — HOTMESS Radio",
  description: "London's Filth Frequency. Live now. Press play, lover. We'll do the rest.",
};

async function fetchSchedule() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  if (!base) {
    // server-side prerender fallback: read local data file
    try {
      const p = join(process.cwd(), 'data', 'shows.json');
      const raw = await readFile(p, 'utf8');
      return JSON.parse(raw);
    } catch (err) {
      return { shows: [] };
    }
  }

  const res = await fetch(`${base}/api/shows`, { next: { revalidate: 60 } });
  if (!res.ok) {
    const res2 = await fetch(`${base}/api/shows`, { cache: "no-store" });
    return res2.json();
  }
  return res.json();
}

export default async function RadioPage() {
  const schedule = await fetchSchedule();
  const { current, next } = getNowNext(schedule);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">HOTMESS RADIO</h1>
        <p className="text-neutral-600">London’s Filth Frequency. 24/7.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Now / Next</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-4 rounded-xl bg-neutral-100">
            <div className="text-xs uppercase text-neutral-500">Now</div>
            {current ? (
              <>
                <div className="font-semibold">{current.title}</div>
                <div className="text-sm text-neutral-600">{current.host ?? ""}</div>
                <div className="text-xs text-neutral-500">{current.start}–{current.end}</div>
              </>
            ) : <div className="text-sm">Nothing live right now.</div>}
          </div>
          <div className="p-4 rounded-xl bg-neutral-100">
            <div className="text-xs uppercase text-neutral-500">Next</div>
            {next ? (
              <>
                <div className="font-semibold">{next.title}</div>
                <div className="text-sm text-neutral-600">{next.host ?? ""}</div>
                <div className="text-xs text-neutral-500">{next.start}–{next.end}</div>
              </>
            ) : <div className="text-sm">No upcoming show today.</div>}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Listen Live</h2>
        {STREAM_URL ? (
          <ModernAudioPlayer src={STREAM_URL} />
        ) : (
          <div className="text-sm text-neutral-500">Set NEXT_PUBLIC_STREAM_URL in .env.local</div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Today’s Schedule</h2>
        <ScheduleList schedule={schedule} />
      </section>
    </main>
  );
}

function ScheduleList({ schedule }: { schedule: { shows: any[] } }) {
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const today = dayNames[new Date().getDay()];
  const todays = schedule.shows.filter((s: any) => s.days.includes(today))
    .sort((a:any,b:any)=> a.start.localeCompare(b.start));
  if (!todays.length) return <p className="text-sm text-neutral-500">No shows listed for today.</p>;
  return (
    <ul className="divide-y">
      {todays.map((s:any, i:number)=>(
        <li key={i} className="py-3 flex items-center justify-between">
          <div>
            <div className="font-medium">{s.title}</div>
            <div className="text-sm text-neutral-600">{s.host ?? ""}</div>
          </div>
          <div className="text-sm tabular-nums text-neutral-500">{s.start}–{s.end}</div>
        </li>
      ))}
    </ul>
  );
}