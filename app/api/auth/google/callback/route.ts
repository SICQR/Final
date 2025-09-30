import { NextRequest, NextResponse } from 'next/server';
import { getGoogleUser, createSessionToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      new URL(`/auth/error?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/auth/error?error=missing_code', request.url)
    );
  }

  try {
    const user = await getGoogleUser(code);
    
    if (!user) {
      return NextResponse.redirect(
        new URL('/auth/error?error=invalid_user', request.url)
      );
    }

    const token = createSessionToken(user);
    
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/auth/error?error=oauth_failed', request.url)
    );
  }
}