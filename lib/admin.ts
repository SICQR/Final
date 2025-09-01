import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function getScanStats() {
  const { data } = await supabase.rpc("count_scans_by_source");
  return data || [];
}

export async function getAffiliateLeaderboard() {
  const { data } = await supabase.rpc("affiliate_leaderboard");
  return data || [];
}

export async function getNowPlaying() {
  const res = await fetch(process.env.NEXT_PUBLIC_NOWPLAYING_URL!);
  return await res.json();
}

export async function getPayoutStatus() {
  const { data } = await supabase.from("payouts").select("*, affiliates(handle)").order("created_at", { ascending: false });
  return data || [];
}