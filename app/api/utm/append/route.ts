import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("to");
  if (!target) return NextResponse.json({ error: "missing to" }, { status: 400 });

  const url = new URL(target);
  const utms = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"];
  utms.forEach(k => {
    const v = req.nextUrl.searchParams.get(k) ?? "";
    if (v) url.searchParams.set(k, v);
  });

  return NextResponse.redirect(url.toString(), 302);
}