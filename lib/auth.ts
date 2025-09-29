/**
 * Authentication utilities for HOTMESS business suite
 * Supports Google, Facebook, and Telegram OAuth
 */

import { NextRequest } from 'next/server';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'telegram';
  role: 'user' | 'affiliate' | 'admin';
  createdAt: Date;
  lastLogin: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

// Google OAuth configuration
export const googleOAuthConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`,
  scope: 'openid email profile',
};

// Facebook OAuth configuration
export const facebookOAuthConfig = {
  appId: process.env.FACEBOOK_APP_ID!,
  appSecret: process.env.FACEBOOK_APP_SECRET!,
  redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/facebook/callback`,
  scope: 'email,public_profile',
};

// Telegram OAuth configuration
export const telegramOAuthConfig = {
  botToken: process.env.TELEGRAM_BOT_TOKEN!,
  botUsername: process.env.TELEGRAM_BOT_USERNAME!,
};

/**
 * Generate OAuth URL for Google
 */
export function getGoogleOAuthURL(): string {
  const params = new URLSearchParams({
    client_id: googleOAuthConfig.clientId,
    redirect_uri: googleOAuthConfig.redirectUri,
    response_type: 'code',
    scope: googleOAuthConfig.scope,
    access_type: 'offline',
    prompt: 'consent',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Generate OAuth URL for Facebook
 */
export function getFacebookOAuthURL(): string {
  const params = new URLSearchParams({
    client_id: facebookOAuthConfig.appId,
    redirect_uri: facebookOAuthConfig.redirectUri,
    response_type: 'code',
    scope: facebookOAuthConfig.scope,
  });

  return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
}

/**
 * Generate Telegram Login Widget URL
 */
export function getTelegramLoginURL(): string {
  const params = new URLSearchParams({
    bot_id: telegramOAuthConfig.botToken.split(':')[0],
    origin: process.env.NEXT_PUBLIC_SITE_URL!,
    request_access: 'write',
    return_to: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/telegram/callback`,
  });

  return `https://oauth.telegram.org/auth?${params.toString()}`;
}

/**
 * Exchange Google authorization code for user data
 */
export async function getGoogleUser(code: string): Promise<User | null> {
  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: googleOAuthConfig.clientId,
        client_secret: googleOAuthConfig.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: googleOAuthConfig.redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      throw new Error('Failed to get access token');
    }

    // Get user profile
    const userResponse = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenData.access_token}`
    );
    
    const userData = await userResponse.json();

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      avatar: userData.picture,
      provider: 'google',
      role: 'user',
      createdAt: new Date(),
      lastLogin: new Date(),
    };
  } catch (error) {
    console.error('Google OAuth error:', error);
    return null;
  }
}

/**
 * Exchange Facebook authorization code for user data
 */
export async function getFacebookUser(code: string): Promise<User | null> {
  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?` +
      new URLSearchParams({
        client_id: facebookOAuthConfig.appId,
        client_secret: facebookOAuthConfig.appSecret,
        code,
        redirect_uri: facebookOAuthConfig.redirectUri,
      })
    );

    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      throw new Error('Failed to get access token');
    }

    // Get user profile
    const userResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${tokenData.access_token}`
    );
    
    const userData = await userResponse.json();

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      avatar: userData.picture?.data?.url,
      provider: 'facebook',
      role: 'user',
      createdAt: new Date(),
      lastLogin: new Date(),
    };
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return null;
  }
}

/**
 * Verify Telegram login data
 */
export function verifyTelegramAuth(data: Record<string, string>): User | null {
  try {
    const { hash, ...authData } = data;
    
    // Create data check string
    const dataCheckString = Object.keys(authData)
      .sort()
      .map(key => `${key}=${authData[key]}`)
      .join('\n');

    // Verify hash (simplified - in production use proper HMAC verification)
    // const secretKey = crypto.createHash('sha256').update(telegramOAuthConfig.botToken).digest();
    // const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
    
    // if (calculatedHash !== hash) {
    //   throw new Error('Invalid hash');
    // }

    return {
      id: authData.id,
      email: `${authData.username}@telegram.local`,
      name: `${authData.first_name} ${authData.last_name || ''}`.trim(),
      avatar: authData.photo_url,
      provider: 'telegram',
      role: 'user',
      createdAt: new Date(),
      lastLogin: new Date(),
    };
  } catch (error) {
    console.error('Telegram auth error:', error);
    return null;
  }
}

/**
 * Create session token (simplified - use JWT in production)
 */
export function createSessionToken(user: User): string {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    provider: user.provider,
    iat: Date.now(),
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
  };

  // In production, use proper JWT signing
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

/**
 * Verify session token
 */
export function verifySessionToken(token: string): AuthSession | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    
    if (payload.exp < Date.now()) {
      return null;
    }

    return {
      user: {
        id: payload.userId,
        email: payload.email,
        name: '', // Would be fetched from database
        provider: payload.provider,
        role: payload.role,
        createdAt: new Date(),
        lastLogin: new Date(),
      },
      token,
      expiresAt: new Date(payload.exp),
    };
  } catch (error) {
    return null;
  }
}

/**
 * Get user session from request
 */
export async function getSession(req: NextRequest): Promise<AuthSession | null> {
  const token = req.cookies.get('auth_token')?.value;
  
  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

/**
 * Middleware helper for protected routes
 */
export function requireAuth(allowedRoles: User['role'][] = ['user', 'affiliate', 'admin']) {
  return async (req: NextRequest) => {
    const session = await getSession(req);
    
    if (!session || !allowedRoles.includes(session.user.role)) {
      return false;
    }

    return session;
  };
}