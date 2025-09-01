import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

function getNotion() {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_TOKEN missing");
  return new Client({ auth: token });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const type = (body.type || "").toString();

    const notion = getNotion();

    if (type === "affiliate") {
      const db = process.env.NOTION_DB_AFFILIATES;
      if (!db) return NextResponse.json({ ok: true, note: "no DB configured" });
      const a = body.data || {};
      await notion.pages.create({
        parent: { database_id: db },
        properties: {
          Name: { title: [{ text: { content: a.display_name || a.handle || "Affiliate" } }] },
          Handle: { rich_text: [{ text: { content: a.handle || "" } }] },
          TG: { number: a.tg_user_id ? Number(a.tg_user_id) : null },
          Active: { checkbox: a.active !== false }
        }
      });
    } else if (type === "scan") {
      const db = process.env.NOTION_DB_SCANS;
      if (!db) return NextResponse.json({ ok: true, note: "no DB configured" });
      const s = body.data || {};
      await notion.pages.create({
        parent: { database_id: db },
        properties: {
          Time: { date: { start: s.scanned_at || new Date().toISOString() } },
          SKU: { rich_text: [{ text: { content: s.sku || "" } }] },
          Source: { select: { name: s.source || "qr" } },
          Affiliate: { rich_text: [{ text: { content: s.affiliate_id || "" } }] }
        }
      });
    } else if (type === "payout") {
      const db = process.env.NOTION_DB_PAYOUTS;
      if (!db) return NextResponse.json({ ok: true, note: "no DB configured" });
      const p = body.data || {};
      await notion.pages.create({
        parent: { database_id: db },
        properties: {
          Period: { rich_text: [{ text: { content: `${p.period_start || ""} → ${p.period_end || ""}` } }] },
          Affiliate: { rich_text: [{ text: { content: p.affiliate_id || "" } }] },
          NetGBP: { number: p.net_cents ? Number(p.net_cents) / 100 : 0 },
          Status: { select: { name: p.status || "pending" } }
        }
      });
    } else {
      return NextResponse.json({ error: "unknown type" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "notion error" }, { status: 500 });
  }
}