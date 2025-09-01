import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getServerAdmin } from "@/lib/supabase";

function getJWT() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !key) throw new Error("Google SA env missing");
  // handle escaped newlines from env
  key = key.replace(/\\n/g, "\n");
  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const mode = (body.mode || "append").toString();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const sheetRange = body.range || "Scans!A1";
    if (!spreadsheetId) throw new Error("GOOGLE_SHEETS_ID missing");

    const auth = getJWT();
    const sheets = google.sheets({ version: "v4", auth });

    let rows: (string | number | null)[][] = [];

    if (mode === "sync_scans") {
      const supabase = getServerAdmin();
      const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
      const { data, error } = await supabase
        .from("qr_scans")
        .select("scanned_at, sku, affiliate_id, source, utm_source, utm_medium, utm_campaign, utm_term, utm_content, referrer")
        .gte("scanned_at", since)
        .order("scanned_at", { ascending: true });
      if (error) throw error;

      rows = (data || []).map((r: any) => ([
        r.scanned_at,
        r.sku || null,
        r.affiliate_id || null,
        r.source || null,
        r.utm_source || null,
        r.utm_medium || null,
        r.utm_campaign || null,
        r.utm_term || null,
        r.utm_content || null,
        r.referrer || null
      ]));
    } else if (Array.isArray(body.rows)) {
      rows = body.rows;
    } else {
      throw new Error("Provide rows or mode=sync_scans");
    }

    if (!rows.length) return NextResponse.json({ ok: true, note: "no rows" });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetRange,
      valueInputOption: "RAW",
      requestBody: { values: rows }
    });

    return NextResponse.json({ ok: true, appended: rows.length });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "sheets error" }, { status: 500 });
  }
}