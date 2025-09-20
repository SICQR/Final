import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Affiliate code is required'
      }, { status: 400 });
    }

    // In a real implementation, you would:
    // 1. Validate the affiliate code
    // 2. Get stats from database
    // 3. Return actual data

    const mockStats = {
      code,
      clicks: Math.floor(Math.random() * 100),
      conversions: Math.floor(Math.random() * 10),
      commission: Math.floor(Math.random() * 500),
      totalEarnings: Math.floor(Math.random() * 2000)
    };

    return NextResponse.json<ApiResponse<typeof mockStats>>({
      success: true,
      data: mockStats
    });

  } catch (error) {
    console.error('Affiliate stats error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { telegramUserId, referralCode } = body;

    if (!telegramUserId) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Telegram user ID is required'
      }, { status: 400 });
    }

    // In a real implementation, you would:
    // 1. Create affiliate record in database
    // 2. Generate unique code
    // 3. Send welcome message via Telegram

    const newAffiliateCode = `HM${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json<ApiResponse<{ code: string }>>({
      success: true,
      data: { code: newAffiliateCode },
      message: 'Affiliate account created successfully!'
    });

  } catch (error) {
    console.error('Affiliate creation error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}