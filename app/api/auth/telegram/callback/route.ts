import { NextRequest, NextResponse } from 'next/server';
import { verifyTelegramAuth, createSessionToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = verifyTelegramAuth(body);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid Telegram authentication' },
        { status: 400 }
      );
    }

    const token = createSessionToken(user);
    
    const response = NextResponse.json({ success: true, user });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Telegram OAuth error:', error);
    return NextResponse.json(
      { error: 'Telegram authentication failed' },
      { status: 500 }
    );
  }
}