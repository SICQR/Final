import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Community — HOTMESS",
  description: "Connect with the HOTMESS community. Share stories, get support, and celebrate together.",
};

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
  comments: number;
  tags: string[];
  featured: boolean;
}

async function getPosts(): Promise<Post[]> {
  try {
    // In development, we'll use a fallback since the API might not be running
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    // Fallback to mock data
    return [
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
        title: "Aftercare Tips for Newbies",
        content: "For anyone new to the scene: aftercare isn't just about the physical stuff. Check in with yourself, hydrate, and don't be afraid to reach out if you need support. We're all here for each other. 🤗",
        author: "CommunitySupport",
        authorAvatar: "/placeholder-avatar.jpg",
        createdAt: "2024-01-23T09:15:00Z",
        likes: 89,
        comments: 31,
        tags: ["aftercare", "support", "community"],
        featured: true
      }
    ];
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return formatDate(dateString);
}

export default async function CommunityPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 text-hotpink">
              Community
            </h1>
            <p className="text-2xl text-gray-300 mb-4">
              Connect, share, and support each other.
            </p>
            <p className="text-lg text-hung italic">
              &ldquo;Hand 'n' hand is the only way to land.&rdquo;
            </p>
          </div>

          {/* Community Guidelines */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4 text-hotpink">Community Guidelines</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2 text-hung">Be Respectful</h3>
                <p className="text-gray-300">Treat everyone with kindness and respect. We're all here to support each other.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-hotpink">Stay Safe</h3>
                <p className="text-gray-300">Don't share personal information. Report anything that makes you uncomfortable.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-hung">Support Others</h3>
                <p className="text-gray-300">Offer help, share resources, and celebrate each other's wins.</p>
              </div>
            </div>
          </div>

          {/* Create Post */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Share something with the community..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:border-hotpink focus:outline-none"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2">
                    <button className="text-sm px-3 py-1 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                      📷 Photo
                    </button>
                    <button className="text-sm px-3 py-1 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                      📹 Video
                    </button>
                    <button className="text-sm px-3 py-1 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                      🏷️ Tag
                    </button>
                  </div>
                  <button className="btn-primary px-6 py-2">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`bg-gray-900 p-6 rounded-lg border transition-colors ${
                  post.featured ? 'border-hotpink' : 'border-gray-800'
                }`}
              >
                {post.featured && (
                  <div className="flex items-center mb-4">
                    <span className="bg-hotpink text-black text-xs font-bold px-2 py-1 rounded">
                      FEATURED
                    </span>
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{post.author}</h3>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-400 text-sm">{timeAgo(post.createdAt)}</span>
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-3 text-white">{post.title}</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">{post.content}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 text-xs rounded-full border border-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <button className="flex items-center space-x-2 hover:text-hotpink transition-colors">
                        <span>❤️</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-hung transition-colors">
                        <span>💬</span>
                        <span>{post.comments}</span>
                      </button>
                      <button className="hover:text-hotpink transition-colors">
                        🔗 Share
                      </button>
                      <button className="hover:text-hung transition-colors">
                        📌 Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-secondary px-8 py-3">
              Load More Posts
            </button>
          </div>

          {/* Community Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-hotpink mb-2">1,247</div>
              <div className="text-gray-300">Community Members</div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-hung mb-2">342</div>
              <div className="text-gray-300">Posts This Month</div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-hotpink mb-2">89</div>
              <div className="text-gray-300">Active Today</div>
            </div>
          </div>

          {/* Join Community */}
          <div className="text-center mt-16 p-8 bg-gray-900 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-heading font-bold mb-4 text-hung">
              Join Our Community
            </h3>
            <p className="text-gray-300 mb-6">
              Connect with us on other platforms for even more community love.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-primary">Join Discord</button>
              <button className="btn-secondary">Follow Instagram</button>
              <button className="btn-primary">Telegram Group</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}