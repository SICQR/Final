import { NextRequest, NextResponse } from "next/server";
import { createDiscountCode } from "@/lib/shopify";

export async function POST(req: NextRequest) {
  const { userId, loungeMember } = await req.json();
  if (!loungeMember) return NextResponse.json({ error: "Not lounge member" }, { status: 403 });
  const code = await createDiscountCode(userId, 9); // £9 off
  return NextResponse.json({ code });
}