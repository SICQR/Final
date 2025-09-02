import { NextRequest, NextResponse } from "next/server";

export const revalidate = 15;

export async function GET() {
  const url = process.env.RADIOKING_NOWPLAYING_URL;
  if (!url) return NextResponse.json({ artist: "HOTMESS", title: "Live" });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch failed");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ artist: "HOTMESS", title: "Live" });
  }
}
