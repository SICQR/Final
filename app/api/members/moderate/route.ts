// ...existing code...
import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/sanity";

export async function POST(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    
    // Check if Sanity is properly configured
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
    if (!projectId || projectId === "placeholder") {
      return NextResponse.json({ ok: false, error: "Sanity not configured" }, { status: 503 });
    }
    
    const client = getClient(false);
    await client.patch(id).set({ status }).commit({ token: process.env.SANITY_API_WRITE_TOKEN });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = typeof e === 'object' && e && 'message' in e ? (e as any).message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
