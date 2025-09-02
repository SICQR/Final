import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const short = req.nextUrl.searchParams.get("short");
  const utm_ref = req.headers.get("referer") || "";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  if (!short) return NextResponse.json({ error: "missing short param" }, { status: 400 });
  let target = `${site}/drop/${short}?utm_source=qr&utm_medium=scan`;
  if (utm_ref) target += `&utm_ref=${encodeURIComponent(utm_ref)}`;
  return NextResponse.redirect(target, 302);
}