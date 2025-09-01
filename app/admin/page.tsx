export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getServerAdmin } from "@/lib/supabase";

type NowPlaying = { artist?: string; title?: string; show?: string };

async function getNowPlaying(): Promise<NowPlaying> {
  const url = process.env.NEXT_PUBLIC_NOWPLAYING_URL;
  if (!url) return {};
  try {
    const r = await fetch(url, { cache: "no-store" });
    const j = await r.json();
    return {
      artist: j?.artist ?? j?.current?.artist,
      title: j?.title ?? j?.current?.title,
      show: j?.show ?? j?.current?.show
    };
  } catch {
    return {};
  }
}

async function countScansSince(days: number) {
  try {
    const supabase = getServerAdmin();
    const since = new Date(Date.now() - days * 24 * 3600 * 1000).toISOString();
    const { count, error } = await supabase
      .from("qr_scans")
      .select("*", { count: "exact", head: true })
      .gte("scanned_at", since);
    if (error) throw error;
    return count || 0;
  } catch {
    return 0;
  }
}

async function getPayouts(limit = 10) {
  try {
    const supabase = getServerAdmin();
    const { data, error } = await supabase
      .from("payouts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

async function getAffiliateLeaderboard(limit = 10) {
  try {
    const supabase = getServerAdmin();
    // Pull recent scans (last 30d), aggregate in memory (simple & safe)
    const since = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
    const { data: scans, error: e1 } = await supabase
      .from("qr_scans")
      .select("affiliate_id")
      .gte("scanned_at", since)
      .limit(20000);
    if (e1) throw e1;
    const counts = new Map<string, number>();
    for (const s of scans || []) {
      const id = (s as any).affiliate_id as string | null;
      if (!id) continue;
      counts.set(id, (counts.get(id) || 0) + 1);
    }
    const ids = Array.from(counts.keys());
    if (!ids.length) return [];
    const { data: affiliates, error: e2 } = await supabase
      .from("affiliates")
      .select("id, handle, display_name")
      .in("id", ids);
    if (e2) throw e2;

    const byId = new Map(affiliates?.map(a => [a.id, a]) || []);
    const rows = Array.from(counts.entries()).map(([id, scans]) => ({
      id,
      scans,
      handle: byId.get(id)?.handle ?? "unknown",
      display_name: byId.get(id)?.display_name ?? "Unknown"
    }));
    rows.sort((a, b) => b.scans - a.scans);
    return rows.slice(0, limit);
  } catch {
    return [];
  }
}

export default async function AdminPage() {
  const [today, week, month] = await Promise.all([
    countScansSince(1),
    countScansSince(7),
    countScansSince(30)
  ]);
  const [np, leaderboard, payouts] = await Promise.all([
    getNowPlaying(),
    getAffiliateLeaderboard(10),
    getPayouts(10)
  ]);

  return (
    <section className="px-4 py-8 mx-auto max-w-6xl">
      <h1 className="font-heading text-4xl mb-6">Admin Dashboard</h1>

      {/* KPI cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <p className="text-sm opacity-70">Scans — Today</p>
          <p className="text-3xl font-semibold">{today}</p>
        </div>
        <div className="card">
          <p className="text-sm opacity-70">Scans — 7 Days</p>
          <p className="text-3xl font-semibold">{week}</p>
        </div>
        <div className="card">
          <p className="text-sm opacity-70">Scans — 30 Days</p>
          <p className="text-3xl font-semibold">{month}</p>
        </div>
      </div>

      {/* Now Playing */}
      <div className="card mb-6">
        <p className="text-sm opacity-70">Now Playing</p>
        <p className="text-xl font-semibold">
          {np.artist ? `${np.artist} — ${np.title ?? ""}` : "No data"}
        </p>
        {np.show ? <p className="opacity-80">Show: {np.show}</p> : null}
      </div>

      {/* Leaderboard & Payouts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-semibold mb-3">Affiliate Leaderboard (30d)</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">#</th>
                <th className="py-2">Affiliate</th>
                <th className="py-2 text-right">Scans</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length ? leaderboard.map((r, i) => (
                <tr key={r.id} className="border-b last:border-0">
                  <td className="py-2">{i + 1}</td>
                  <td className="py-2">{r.display_name} <span className="opacity-60">(@{r.handle})</span></td>
                  <td className="py-2 text-right">{r.scans}</td>
                </tr>
              )) : (
                <tr><td colSpan={3} className="py-3 opacity-60">No affiliate data.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2 className="font-semibold mb-3">Payouts (latest)</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Affiliate</th>
                <th className="py-2">Period</th>
                <th className="py-2 text-right">Net (GBP)</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.length ? payouts.map((p: any) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-2">{p.affiliate_id?.slice(0, 8) ?? "—"}</td>
                  <td className="py-2">{p.period_start} → {p.period_end}</td>
                  <td className="py-2 text-right">{(p.net_cents || 0 / 100).toFixed(2)}</td>
                  <td className="py-2">{p.status}</td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="py-3 opacity-60">No payouts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}