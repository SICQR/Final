import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { notFound } from "next/navigation";

interface Event {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  endDate: string;
  location: string;
  venue: string;
  address: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  capacity: number;
  ticketsRemaining: number;
  ageRestriction: string;
  dressCode: string;
  lineup: string[];
  amenities: string[];
  tags: string[];
}

async function getEvent(id: string): Promise<Event | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.event;
  } catch (error) {
    console.error('Failed to fetch event:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const event = await getEvent(params.id);
  
  if (!event) {
    return {
      title: "Event Not Found — HOTMESS",
      description: "The event you're looking for could not be found."
    };
  }

  return {
    title: `${event.title} — HOTMESS`,
    description: event.description,
    openGraph: {
      title: `${event.title} — HOTMESS`,
      description: event.description,
      images: event.images,
    },
  };
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

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  
  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-hotpink">Home</Link>
              <span>/</span>
              <Link href="/events" className="hover:text-hotpink">Events</Link>
              <span>/</span>
              <span className="text-white">{event.title}</span>
            </div>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Event Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-gray-400 text-xl">{event.category} Event</p>
                </div>
                {event.featured && (
                  <div className="absolute top-6 left-6 bg-hotpink text-black px-3 py-2 text-sm font-bold rounded">
                    FEATURED EVENT
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div>
                <div className="text-sm text-hung font-semibold mb-2">{event.category}</div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{event.title}</h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">{event.longDescription}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-sm rounded-full border border-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Event Info Grid */}
              <div className="grid md:grid-cols-2 gap-8 p-6 bg-gray-900 rounded-lg border border-gray-800">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-hotpink">Event Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Date:</span>
                      <div className="text-white">{formatDate(event.date)}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Time:</span>
                      <div className="text-white">{formatTime(event.date)} - {formatTime(event.endDate)}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Age Restriction:</span>
                      <div className="text-white">{event.ageRestriction}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Dress Code:</span>
                      <div className="text-white">{event.dressCode}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-hung">Location</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Venue:</span>
                      <div className="text-white">{event.venue}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Location:</span>
                      <div className="text-white">{event.location}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Address:</span>
                      <div className="text-white">{event.address}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Capacity:</span>
                      <div className="text-white">{event.capacity} people</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lineup */}
              <div>
                <h3 className="text-2xl font-heading font-bold mb-6 text-hotpink">Lineup & Schedule</h3>
                <div className="space-y-4">
                  {event.lineup.map((performer, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                        <span className="text-lg">🎵</span>
                      </div>
                      <div>
                        <div className="font-semibold">{performer}</div>
                        <div className="text-sm text-gray-400">Performer</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-2xl font-heading font-bold mb-6 text-hung">Amenities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {event.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-900 rounded-lg">
                      <span className="text-green-400 mr-3">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Ticket Info */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-hotpink mb-2">
                      {event.price === 0 ? 'FREE' : `£${event.price}`}
                    </div>
                    <div className="text-sm text-gray-400">per ticket</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tickets Remaining:</span>
                      <span className={event.ticketsRemaining < 20 ? 'text-red-400' : 'text-green-400'}>
                        {event.ticketsRemaining}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capacity:</span>
                      <span>{event.capacity}</span>
                    </div>
                  </div>

                  {event.ticketsRemaining > 0 ? (
                    <div className="space-y-3">
                      <button className="btn-primary w-full text-lg py-4">
                        Book Tickets
                      </button>
                      <button className="w-full py-3 border border-gray-600 rounded-lg hover:border-gray-400 transition-colors">
                        Add to Calendar
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <button className="btn-secondary w-full text-lg py-4" disabled>
                        Sold Out
                      </button>
                      <button className="w-full py-3 mt-3 border border-gray-600 rounded-lg hover:border-gray-400 transition-colors">
                        Join Waitlist
                      </button>
                    </div>
                  )}
                </div>

                {/* Share Event */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">Share Event</h3>
                  <div className="space-y-3">
                    <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      Share on Facebook
                    </button>
                    <button className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors">
                      Share on Instagram
                    </button>
                    <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      Copy Link
                    </button>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">Questions?</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Need help with booking or have questions about the event?
                  </p>
                  <button className="btn-secondary w-full">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}