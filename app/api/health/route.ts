import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    sanityConfigured: !!(process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
    adminConfigured: !!(process.env.ADMIN_USER && process.env.ADMIN_PASS),
  };

  return NextResponse.json(health, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache',
    }
  });
}