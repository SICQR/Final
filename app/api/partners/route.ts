import { NextResponse } from 'next/server';

export async function GET() {
  // Mock partners data
  const partners = [
    {
      id: 1,
      name: "RAW CONVICT RECORDS",
      description: "Underground music label pushing boundaries in electronic and experimental sounds",
      logo: "/placeholder-partner-logo.jpg",
      website: "https://rawconvictrecords.com",
      category: "MUSIC",
      featured: true,
      partnership: "Exclusive music for HOTMESS events and radio shows"
    },
    {
      id: 2,
      name: "Queer Community Hub",
      description: "London's premier LGBTQ+ community center offering support, events, and resources",
      logo: "/placeholder-partner-logo.jpg", 
      website: "https://queercommunityhub.org",
      category: "COMMUNITY",
      featured: true,
      partnership: "Wellness workshops and community support services"
    },
    {
      id: 3,
      name: "Underground Venues Network",
      description: "Collective of alternative venues supporting queer nightlife across London",
      logo: "/placeholder-partner-logo.jpg",
      website: "https://undergroundvenues.london", 
      category: "VENUES",
      featured: false,
      partnership: "Preferred venues for HOTMESS events and radio broadcasts"
    },
    {
      id: 4,
      name: "Ethical Fashion Collective",
      description: "Sustainable fashion brands committed to ethical production and queer representation",
      logo: "/placeholder-partner-logo.jpg",
      website: "https://ethicalfashioncollective.com",
      category: "FASHION",
      featured: true,
      partnership: "Sustainable materials and ethical production for HOTMESS drops"
    },
    {
      id: 5,
      name: "Mental Health Support Network",
      description: "Specialized mental health services for LGBTQ+ individuals and communities",
      logo: "/placeholder-partner-logo.jpg",
      website: "https://mhsupport.org.uk",
      category: "WELLNESS",
      featured: false,
      partnership: "Professional support services and aftercare resources"
    },
    {
      id: 6,
      name: "Digital Arts Collective",
      description: "Creative technology collective specializing in immersive digital experiences",
      logo: "/placeholder-partner-logo.jpg",
      website: "https://digitalartscollective.com",
      category: "TECHNOLOGY", 
      featured: false,
      partnership: "Digital art installations and interactive experiences"
    }
  ];

  return NextResponse.json({ partners });
}