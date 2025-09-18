import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Events — HOTMESS",
  description: "Join us for unforgettable nights, community gatherings, and exclusive shows. Always too much, never enough.",
};

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  venue: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  capacity: number;
  ticketsRemaining: number;
}

async function getEvents(): Promise<Event[]> {
  try {
    // In development, we'll use a fallback since the API might not be running
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch events');
    }
    
    const data = await res.json();
    return data.events;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    // Fallback to mock data
    return [
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
      }
    ];
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 text-hotpink">
              Events
            </h1>
            <p className="text-2xl text-gray-300 mb-4">
              Join us for unforgettable nights, community gatherings, and exclusive shows.
            </p>
            <p className="text-lg text-hung italic">
              &ldquo;Always too much, never enough.&rdquo;
            </p>
          </div>

          {/* Event Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="btn-primary">All Events</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hotpink transition-colors">Radio</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hung transition-colors">Fashion</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hotpink transition-colors">Wellness</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hung transition-colors">Community</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hotpink transition-colors">Exclusive</button>
          </div>

          <div className="space-y-8">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/event/${event.id}`}
                className="block bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-hotpink transition-colors group"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="aspect-video md:aspect-square bg-gray-800 flex items-center justify-center relative">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎉</div>
                        <p className="text-gray-600 font-heading text-lg">
                          {event.category}
                        </p>
                      </div>
                      {event.featured && (
                        <div className="absolute top-4 left-4 bg-hotpink text-black px-2 py-1 text-xs font-bold rounded">
                          FEATURED
                        </div>
                      )}
                      {event.ticketsRemaining < 20 && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                          LIMITED TICKETS
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl mb-3 group-hover:text-hotpink transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {event.description}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-400 mb-1">Date & Time</div>
                            <div className="text-white">
                              {formatDate(event.date)}
                            </div>
                            <div className="text-gray-300">
                              {formatTime(event.date)} - {formatTime(event.endDate)}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-gray-400 mb-1">Location</div>
                            <div className="text-white">{event.location}</div>
                            <div className="text-gray-300">{event.venue}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl font-bold text-hung">
                            {event.price === 0 ? 'FREE' : `£${event.price}`}
                          </div>
                          <div className="text-sm text-gray-400">
                            {event.ticketsRemaining} tickets left
                          </div>
                        </div>
                        
                        <span className="text-sm text-gray-400 group-hover:text-hung transition-colors">
                          View Details & Book →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              Stay tuned for more events. Follow us to never miss out.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-secondary">
                Subscribe to Updates
              </button>
              <button className="btn-primary">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}