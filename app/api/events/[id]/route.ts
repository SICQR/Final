import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const eventId = parseInt(params.id);
  
  // Mock event data - in a real app this would come from a database
  const events = [
    {
      id: 1,
      title: "HOTMESS Live: Friday Night Frequency",
      description: "Join us for a night of raw beats, queer energy, and unforgettable vibes.",
      longDescription: "Experience the ultimate HOTMESS night out. Our Friday Night Frequency events bring together London's most electric queer community for an unforgettable evening of music, fashion, and pure energy. Featuring live DJ sets, exclusive fashion previews, and the kind of aftercare that makes sure everyone gets home safe. This is more than a party—it's a frequency you'll never want to leave.",
      date: "2024-01-26T22:00:00Z",
      endDate: "2024-01-27T04:00:00Z",
      location: "The Frequency, London",
      venue: "Underground Club, Shoreditch",
      address: "123 Electric Lane, Shoreditch, London E1 6AN",
      price: 25,
      images: ["/placeholder-event.jpg", "/placeholder-event-2.jpg"],
      category: "RADIO",
      featured: true,
      capacity: 300,
      ticketsRemaining: 45,
      ageRestriction: "18+",
      dressCode: "HOTMESS casual - express yourself",
      lineup: ["DJ HOTMESS", "Stewart Who", "Nick Denton"],
      amenities: ["Full Bar", "Coat Check", "Accessible Venue", "Aftercare Space"],
      tags: ["LGBTQ+", "Electronic", "Underground", "Community"]
    },
    {
      id: 2,
      title: "HUNG Collection Launch Party",
      description: "Celebrate the launch of our latest HUNG collection with exclusive previews.",
      longDescription: "Be the first to see and shop our latest HUNG collection in an intimate launch setting. This exclusive party combines fashion showcase with community celebration. Enjoy drinks, music, and the chance to meet the designers behind the pieces that are redefining queer fashion.",
      date: "2024-02-02T19:00:00Z", 
      endDate: "2024-02-02T23:00:00Z",
      location: "HOTMESS HQ, London",
      venue: "Pop-up Space, East London",
      address: "456 Creative Street, Hackney, London E8 2LX",
      price: 15,
      images: ["/placeholder-event.jpg", "/placeholder-event-2.jpg"],
      category: "FASHION",
      featured: true,
      capacity: 150,
      ticketsRemaining: 23,
      ageRestriction: "All ages welcome",
      dressCode: "Come as you are",
      lineup: ["Fashion Show", "Designer Q&A", "Styling Sessions"],
      amenities: ["Refreshments", "Exclusive Shopping", "Photo Booth"],
      tags: ["Fashion", "Launch", "Exclusive", "Shopping"]
    },
    {
      id: 3,
      title: "Aftercare Workshop: HNHMESS",
      description: "A safe space workshop focusing on community care and support.",
      longDescription: "HAND 'N' HAND IS THE ONLY WAY TO LAND. Join us for a meaningful workshop dedicated to community care, emotional wellness, and mutual support. Learn practical aftercare techniques, connect with others who understand, and contribute to building a more caring community.",
      date: "2024-02-10T14:00:00Z",
      endDate: "2024-02-10T17:00:00Z", 
      location: "Community Center, London",
      venue: "Queer Community Hub",
      address: "789 Wellness Way, Camden, London NW1 8QT",
      price: 0,
      images: ["/placeholder-event.jpg", "/placeholder-event-2.jpg"],
      category: "WELLNESS",
      featured: false,
      capacity: 50,
      ticketsRemaining: 12,
      ageRestriction: "16+ (under 18s must be accompanied)",
      dressCode: "Comfortable clothing",
      lineup: ["Wellness Facilitators", "Community Leaders", "Peer Support"],
      amenities: ["Free Refreshments", "Resource Materials", "Quiet Spaces"],
      tags: ["Wellness", "Community", "Support", "Free"]
    },
    {
      id: 4,
      title: "SUPER Exclusive Show",
      description: "An invitation-only showcase of our most daring designs.",
      longDescription: "Push boundaries with us at this ultra-exclusive showcase featuring our most avant-garde designs. This invitation-only event is for those ready to experience fashion at its most experimental and fearless. Very limited capacity.",
      date: "2024-02-15T20:00:00Z",
      endDate: "2024-02-16T02:00:00Z",
      location: "Secret Location, London", 
      venue: "TBA",
      address: "Location revealed 24h before event",
      price: 50,
      images: ["/placeholder-event.jpg", "/placeholder-event-2.jpg"],
      category: "EXCLUSIVE",
      featured: true,
      capacity: 100,
      ticketsRemaining: 8,
      ageRestriction: "21+",
      dressCode: "Avant-garde encouraged",
      lineup: ["Exclusive Runway", "Designer Presentations", "VIP Experience"],
      amenities: ["Premium Bar", "Exclusive Merch", "Private Viewing Areas"],
      tags: ["Exclusive", "Avant-garde", "Limited", "Premium"]
    },
    {
      id: 5,
      title: "Community Meetup & Mix",
      description: "Monthly community gathering with DJ sets and networking.",
      longDescription: "Our monthly community gathering brings together HOTMESS lovers from across London. Mix, mingle, and make connections in a relaxed rooftop setting with stunning city views and carefully curated music.",
      date: "2024-02-20T18:00:00Z",
      endDate: "2024-02-20T22:00:00Z",
      location: "The Social, London",
      venue: "Rooftop Bar, Central London",
      address: "321 Sky Terrace, Fitzrovia, London W1T 5HD",
      price: 10,
      images: ["/placeholder-event.jpg", "/placeholder-event-2.jpg"],
      category: "COMMUNITY", 
      featured: false,
      capacity: 200,
      ticketsRemaining: 87,
      ageRestriction: "18+",
      dressCode: "Smart casual",
      lineup: ["Community DJs", "Networking Sessions", "Social Activities"],
      amenities: ["City Views", "Full Bar", "Networking Zones"],
      tags: ["Community", "Networking", "Monthly", "Social"]
    },
    {
      id: 6,
      title: "RAW Energy Dance Night",
      description: "Pure, unfiltered dance energy. Bring your raw self.",
      longDescription: "Strip away the pretense and bring your RAW self to this pure dance experience. In a converted warehouse space, lose yourself in the music and find yourself in the community. This is dancing at its most honest and liberating.",
      date: "2024-02-25T23:00:00Z",
      endDate: "2024-02-26T06:00:00Z",
      location: "Warehouse 23, London",
      venue: "Industrial Space, South London", 
      address: "23 Industrial Estate, Bermondsey, London SE16 4DG",
      price: 30,
      images: ["/placeholder-event.jpg", "/placeholder-event-2.jpg"],
      category: "DANCE",
      featured: true,
      capacity: 500,
      ticketsRemaining: 156,
      ageRestriction: "18+",
      dressCode: "Whatever makes you feel RAW",
      lineup: ["RAW CONVICT RECORDS", "Underground DJs", "Live Performances"],
      amenities: ["Multiple Dance Floors", "Chill Zones", "Late License"],
      tags: ["Dance", "Underground", "All Night", "RAW"]
    }
  ];

  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json({ event });
}