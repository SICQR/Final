import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => ({}));
  // TODO: verify signature if you add one
  console.log("Make webhook", payload?.event);
  return NextResponse.json({ ok: true });
}