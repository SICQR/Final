import { NextRequest, NextResponse } from 'next/server';
import { getFacebookOAuthURL } from '@/lib/auth';

export async function GET() {
  try {
    const authUrl = getFacebookOAuthURL();
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Facebook OAuth redirect error:', error);
    return NextResponse.json(
      { error: 'Failed to redirect to Facebook OAuth' },
      { status: 500 }
    );
  }
}