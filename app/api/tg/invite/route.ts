import { NextRequest, NextResponse } from "next/server";
import { createTelegramInviteLink } from "@/lib/telegram";
import { getUserFromAuth } from "@/lib/lounge";

export async function POST(req: NextRequest) {
  const user = await getUserFromAuth(req);
  if (!user || !user.tier || !["xxx_lounge","ambassador"].includes(user.tier)) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }
  const invite = await createTelegramInviteLink(user.id);
  return NextResponse.json({ invite });
}