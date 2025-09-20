import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, RadioShow } from '@/types';

const MOCK_SHOWS: RadioShow[] = [
  {
    id: '1',
    title: 'HAND \'N\' HAND',
    description: 'Sunday recovery. The gentlest show in the dirtiest station—sleep, sex, serotonin, survival.',
    schedule: {
      day: 'Sunday',
      time: '14:00',
      duration: 120
    },
    dj: 'SICQR',
    isLive: false,
    streamUrl: 'https://example.com/stream'
  },
  {
    id: '2',
    title: 'The Filth Frequency',
    description: 'Raw beats for raw convicts. Underground sounds for the underground scene.',
    schedule: {
      day: 'Friday',
      time: '22:00',
      duration: 180
    },
    dj: 'Nick Denton',
    isLive: false,
    streamUrl: 'https://example.com/stream'
  },
  {
    id: '3',
    title: 'HUNG Sessions',
    description: 'Late night vibes and experimental sounds.',
    schedule: {
      day: 'Saturday',
      time: '23:00',
      duration: 120
    },
    dj: 'Stewart Who',
    isLive: false,
    streamUrl: 'https://example.com/stream'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const live = searchParams.get('live') === 'true';

    let shows = MOCK_SHOWS;
    
    if (live) {
      // In a real implementation, check which shows are currently live
      const now = new Date();
      const currentHour = now.getHours();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
      
      shows = shows.map(show => ({
        ...show,
        isLive: Math.random() > 0.8 // Random for demo
      }));
    }

    return NextResponse.json<ApiResponse<RadioShow[]>>({
      success: true,
      data: shows
    });

  } catch (error) {
    console.error('Radio shows error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}