import { NextResponse } from 'next/server';

export async function GET() {
  // Mock leaderboard data for affiliate program
  const leaderboard = [
    {
      rank: 1,
      username: "MessQueen2024",
      earnings: 2847.50,
      referrals: 94,
      avatar: "/placeholder-avatar.jpg",
      badge: "SUPER",
      joinedDate: "2023-08-15"
    },
    {
      rank: 2,
      username: "RawEnergy",
      earnings: 2156.75,
      referrals: 72,
      avatar: "/placeholder-avatar.jpg", 
      badge: "HIGH",
      joinedDate: "2023-09-22"
    },
    {
      rank: 3,
      username: "HungForLife",
      earnings: 1923.25,
      referrals: 65,
      avatar: "/placeholder-avatar.jpg",
      badge: "HUNG", 
      joinedDate: "2023-07-11"
    },
    {
      rank: 4,
      username: "FrequencyFan",
      earnings: 1654.00,
      referrals: 58,
      avatar: "/placeholder-avatar.jpg",
      badge: "RAW",
      joinedDate: "2023-10-05"
    },
    {
      rank: 5,
      username: "CommunityLover",
      earnings: 1432.50,
      referrals: 51,
      avatar: "/placeholder-avatar.jpg",
      badge: "RAW",
      joinedDate: "2023-11-18"
    },
    {
      rank: 6,
      username: "AftercarePro",
      earnings: 1289.75,
      referrals: 47,
      avatar: "/placeholder-avatar.jpg",
      badge: "HNHMESS",
      joinedDate: "2023-06-30"
    },
    {
      rank: 7,
      username: "NightOutNow",
      earnings: 1156.25,
      referrals: 42,
      avatar: "/placeholder-avatar.jpg",
      badge: "HIGH",
      joinedDate: "2023-12-02"
    },
    {
      rank: 8,
      username: "StylishSupport",
      earnings: 987.50,
      referrals: 38,
      avatar: "/placeholder-avatar.jpg",
      badge: "HUNG",
      joinedDate: "2023-09-14"
    },
    {
      rank: 9,
      username: "RadioRadical",
      earnings: 834.75,
      referrals: 33,
      avatar: "/placeholder-avatar.jpg",
      badge: "RAW",
      joinedDate: "2023-11-07"
    },
    {
      rank: 10,
      username: "NewToScene",
      earnings: 567.25,
      referrals: 24,
      avatar: "/placeholder-avatar.jpg",
      badge: "STARTER",
      joinedDate: "2024-01-03"
    }
  ];

  const stats = {
    totalAffiliates: 1247,
    totalEarnings: 89654.50,
    totalReferrals: 3892,
    topEarnerThisMonth: "MessQueen2024",
    averageEarnings: 71.95
  };

  return NextResponse.json({ leaderboard, stats });
}