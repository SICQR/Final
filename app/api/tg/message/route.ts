import { NextRequest, NextResponse } from "next/server";
import { logLoungeMessage } from "@/lib/lounge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body?.forward_to_lounge && body?.text) {
  await logLoungeMessage(body.user_id, body.text);
  }
  return NextResponse.json({ ok: true });
}