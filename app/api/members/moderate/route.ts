import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // TODO: moderate logic; for now always OK
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

// Avoid caching for API responses while developing
export const dynamic = 'force-dynamic';
