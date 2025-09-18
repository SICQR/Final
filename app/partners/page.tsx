import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Partners — HOTMESS",
  description: "Meet our incredible partners who help make the HOTMESS experience possible.",
};

interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
  website: string;
  category: string;
  featured: boolean;
  partnership: string;
}

async function getPartners(): Promise<Partner[]> {
  try {
    // In development, we'll use a fallback since the API might not be running
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/partners`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch partners');
    }
    
    const data = await res.json();
    return data.partners;
  } catch (error) {
    console.error('Failed to fetch partners:', error);
    // Fallback to mock data
    return [
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
        name: "Ethical Fashion Collective",
        description: "Sustainable fashion brands committed to ethical production and queer representation",
        logo: "/placeholder-partner-logo.jpg",
        website: "https://ethicalfashioncollective.com",
        category: "FASHION",
        featured: true,
        partnership: "Sustainable materials and ethical production for HOTMESS drops"
      }
    ];
  }
}

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 text-hung">
              Partners
            </h1>
            <p className="text-2xl text-gray-300 mb-4">
              Meet the incredible brands and organizations that help make HOTMESS possible.
            </p>
            <p className="text-lg text-hotpink italic">
              &ldquo;Together we're stronger.&rdquo;
            </p>
          </div>

          {/* Partnership Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-heading font-bold mb-4 text-hotpink">
                Authentic Partnerships
              </h3>
              <p className="text-gray-300">
                We only partner with brands that share our values and commitment to the queer community.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-heading font-bold mb-4 text-hung">
                Sustainable Impact
              </h3>
              <p className="text-gray-300">
                Every partnership focuses on creating positive change and sustainable practices.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
              <div className="text-4xl mb-4">💫</div>
              <h3 className="text-xl font-heading font-bold mb-4 text-hotpink">
                Community First
              </h3>
              <p className="text-gray-300">
                All partnerships prioritize giving back to and supporting our community.
              </p>
            </div>
          </div>

          {/* Partner Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="btn-primary">All Partners</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hotpink transition-colors">Music</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hung transition-colors">Fashion</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hotpink transition-colors">Community</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hung transition-colors">Wellness</button>
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:border-hotpink transition-colors">Technology</button>
          </div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className={`bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105 ${
                  partner.featured 
                    ? 'border-2 border-hotpink shadow-lg shadow-hotpink/20' 
                    : 'border border-gray-800 hover:border-hung'
                }`}
              >
                {partner.featured && (
                  <div className="bg-hotpink text-black text-center py-2">
                    <span className="text-xs font-bold">FEATURED PARTNER</span>
                  </div>
                )}
                
                <div className="p-6">
                  {/* Logo Placeholder */}
                  <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🏢</div>
                      <p className="text-gray-500 text-sm">Partner Logo</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-hung font-semibold mb-1">
                        {partner.category}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-white">
                        {partner.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {partner.description}
                    </p>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-xs text-gray-400 mb-2">Partnership</div>
                      <p className="text-sm text-white">
                        {partner.partnership}
                      </p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-sm py-2 px-4 flex-1 text-center"
                      >
                        Visit Website
                      </a>
                      <button className="btn-secondary text-sm py-2 px-4">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership Benefits */}
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 mb-16">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center text-hotpink">
              Partnership Benefits
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-hung">For Our Community</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span>Exclusive discounts and early access to partner products</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span>Access to specialized services and workshops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span>Community events and collaborative experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span>Support for community initiatives and programs</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-hotpink">For Partners</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span>Access to our engaged and authentic community</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span>Collaborative marketing and content opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span>Platform for showcasing values-aligned products</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <span>Joint events and experiential marketing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Become a Partner */}
          <div className="text-center bg-gray-900 p-8 rounded-lg border border-gray-800">
            <h2 className="text-3xl font-heading font-bold mb-4 text-hung">
              Become a Partner
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Interested in partnering with HOTMESS? We're always looking for authentic brands 
              and organizations that share our values and want to support the queer community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3">
                Partnership Inquiry
              </button>
              <button className="btn-secondary px-8 py-3">
                Download Partnership Deck
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mt-6">
              Partnership applications are reviewed monthly. We'll be in touch within 2-3 weeks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}