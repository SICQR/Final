import { NextResponse } from 'next/server';

export async function GET() {
  // Mock events data
  const events = [
    {
      id: 1,
      title: "HOTMESS Live: Friday Night Frequency",
      description: "Join us for a night of raw beats, queer energy, and unforgettable vibes.",
      date: "2024-01-26T22:00:00Z",
      endDate: "2024-01-27T04:00:00Z",
      location: "The Frequency, London",
      venue: "Underground Club, Shoreditch",
      price: 25,
      image: "/placeholder-event.jpg",
      category: "RADIO",
      featured: true,
      capacity: 300,
      ticketsRemaining: 45
    },
    {
      id: 2,
      title: "HUNG Collection Launch Party",
      description: "Celebrate the launch of our latest HUNG collection with exclusive previews.",
      date: "2024-02-02T19:00:00Z", 
      endDate: "2024-02-02T23:00:00Z",
      location: "HOTMESS HQ, London",
      venue: "Pop-up Space, East London",
      price: 15,
      image: "/placeholder-event.jpg",
      category: "FASHION",
      featured: true,
      capacity: 150,
      ticketsRemaining: 23
    },
    {
      id: 3,
      title: "Aftercare Workshop: HNHMESS",
      description: "A safe space workshop focusing on community care and support.",
      date: "2024-02-10T14:00:00Z",
      endDate: "2024-02-10T17:00:00Z", 
      location: "Community Center, London",
      venue: "Queer Community Hub",
      price: 0,
      image: "/placeholder-event.jpg",
      category: "WELLNESS",
      featured: false,
      capacity: 50,
      ticketsRemaining: 12
    },
    {
      id: 4,
      title: "SUPER Exclusive Show",
      description: "An invitation-only showcase of our most daring designs.",
      date: "2024-02-15T20:00:00Z",
      endDate: "2024-02-16T02:00:00Z",
      location: "Secret Location, London", 
      venue: "TBA",
      price: 50,
      image: "/placeholder-event.jpg",
      category: "EXCLUSIVE",
      featured: true,
      capacity: 100,
      ticketsRemaining: 8
    },
    {
      id: 5,
      title: "Community Meetup & Mix",
      description: "Monthly community gathering with DJ sets and networking.",
      date: "2024-02-20T18:00:00Z",
      endDate: "2024-02-20T22:00:00Z",
      location: "The Social, London",
      venue: "Rooftop Bar, Central London",
      price: 10,
      image: "/placeholder-event.jpg",
      category: "COMMUNITY", 
      featured: false,
      capacity: 200,
      ticketsRemaining: 87
    },
    {
      id: 6,
      title: "RAW Energy Dance Night",
      description: "Pure, unfiltered dance energy. Bring your raw self.",
      date: "2024-02-25T23:00:00Z",
      endDate: "2024-02-26T06:00:00Z",
      location: "Warehouse 23, London",
      venue: "Industrial Space, South London", 
      price: 30,
      image: "/placeholder-event.jpg",
      category: "DANCE",
      featured: true,
      capacity: 500,
      ticketsRemaining: 156
    }
  ];

  return NextResponse.json({ events });
}