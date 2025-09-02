import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.headers.get("x-secret") !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok:false }, { status:401 });
  }
  const { tag } = await req.json();
  try { if (tag && (global as any).revalidateTag) (global as any).revalidateTag(tag); } catch {}
  return NextResponse.json({ ok:true });
}
