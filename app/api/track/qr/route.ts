import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    if (!supabaseUrl || !serviceKey) return NextResponse.json({ ok: true, note: "no supabase configured" });

    const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
    await supabase.from("qr_scans").insert([{
      sku: body?.sku,
      affiliate_id: body?.affiliate_id ?? null,
      source: body?.source ?? "qr",
      utm_source: body?.utm?.source ?? null,
      utm_medium: body?.utm?.medium ?? null,
      utm_campaign: body?.utm?.campaign ?? null,
      utm_term: body?.utm?.term ?? null,
      utm_content: body?.utm?.content ?? null,
      ua: req.headers.get("user-agent"),
      referrer: req.headers.get("referer")
    }]);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}