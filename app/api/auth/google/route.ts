import { NextRequest, NextResponse } from 'next/server';
import { getGoogleOAuthURL } from '@/lib/auth';

export async function GET() {
  try {
    const authUrl = getGoogleOAuthURL();
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Google OAuth redirect error:', error);
    return NextResponse.json(
      { error: 'Failed to redirect to Google OAuth' },
      { status: 500 }
    );
  }
}