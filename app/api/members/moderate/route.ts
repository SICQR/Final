// ...existing code...
import { NextRequest, NextResponse } from "next/server";
import { sanity } from "@/lib/sanity";

export async function POST(req: NextRequest) {
  const { id, status } = await req.json();
  if (!id || !["approved", "rejected"].includes(status)) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }
  try {
    await sanity.patch(id).set({ status }).commit({ token: process.env.SANITY_API_WRITE_TOKEN });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = typeof e === 'object' && e && 'message' in e ? (e as any).message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
