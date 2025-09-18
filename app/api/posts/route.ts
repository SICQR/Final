import { NextResponse } from 'next/server';

export async function GET() {
  // Mock community posts data
  const posts = [
    {
      id: 1,
      title: "Welcome to the HOTMESS Community",
      content: "This is where we share, support, and celebrate together. Drop your thoughts, ask questions, and connect with others who get it.",
      author: "HOTMESS Team",
      authorAvatar: "/placeholder-avatar.jpg",
      createdAt: "2024-01-20T10:00:00Z",
      likes: 42,
      comments: 8,
      tags: ["welcome", "community"],
      featured: true
    },
    {
      id: 2,
      title: "Friday Night Frequency Recap",
      content: "What an incredible night! Thank you to everyone who brought their energy to the dance floor. The aftercare station was busy but that's exactly what we want to see. 💖",
      author: "Stewart Who",
      authorAvatar: "/placeholder-avatar.jpg", 
      createdAt: "2024-01-21T14:30:00Z",
      likes: 156,
      comments: 23,
      tags: ["event-recap", "radio", "aftercare"],
      featured: false
    },
    {
      id: 3,
      title: "New HUNG Collection Thoughts?",
      content: "Seen the preview of the new HUNG pieces? What's everyone thinking? That hoodie is calling my name but I'm torn between the grey and the yellow...",
      author: "MessyQueen2024",
      authorAvatar: "/placeholder-avatar.jpg",
      createdAt: "2024-01-22T16:45:00Z", 
      likes: 28,
      comments: 15,
      tags: ["fashion", "hung", "discussion"],
      featured: false
    },
    {
      id: 4,
      title: "Aftercare Tips for Newbies",
      content: "For anyone new to the scene: aftercare isn't just about the physical stuff. Check in with yourself, hydrate, and don't be afraid to reach out if you need support. We're all here for each other. 🤗",
      author: "CommunitySupport",
      authorAvatar: "/placeholder-avatar.jpg",
      createdAt: "2024-01-23T09:15:00Z",
      likes: 89,
      comments: 31,
      tags: ["aftercare", "support", "community"],
      featured: true
    },
    {
      id: 5,
      title: "RAW Energy Dance Night - Who's Going?",
      content: "Just grabbed my ticket for RAW Energy Dance Night! First time at one of these warehouse events. Any veterans want to share what to expect?",
      author: "FirstTimeRaver",
      authorAvatar: "/placeholder-avatar.jpg",
      createdAt: "2024-01-24T20:00:00Z",
      likes: 34,
      comments: 12,
      tags: ["events", "raw", "first-time"],
      featured: false
    },
    {
      id: 6,
      title: "Monthly Check-in: How Are We All Doing?",
      content: "It's that time again - monthly mental health check-in. How is everyone feeling? Remember, it's okay to not be okay. Share what you're comfortable with. 💜",
      author: "WellnessWarrior",
      authorAvatar: "/placeholder-avatar.jpg",
      createdAt: "2024-01-25T12:00:00Z",
      likes: 67,
      comments: 45,
      tags: ["mental-health", "check-in", "support"],
      featured: true
    }
  ];

  return NextResponse.json({ posts });
}