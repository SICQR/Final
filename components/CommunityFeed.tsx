'use client'

import { useState, useEffect } from 'react'
import { communityService, CommunityPost } from '@/lib/supabase'
import { useSession } from 'next-auth/react'

export default function CommunityFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await communityService.getPosts(4)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching community posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-hotpink">
            Community Vibes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-black p-6 rounded-lg border border-gray-800 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                  <div className="h-4 bg-gray-800 rounded w-24"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-heading font-bold text-center mb-12 text-hotpink">
          Community Vibes
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-black p-6 rounded-lg border border-gray-800 hover:border-hotpink/30 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  {post.user?.avatar_url ? (
                    <img 
                      src={post.user.avatar_url} 
                      alt={post.user.username}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-hotpink rounded-full flex items-center justify-center text-black font-bold">
                      {post.user?.username?.charAt(0).toUpperCase() || 'A'}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{post.user?.username || 'Anonymous'}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{post.content}</p>
                
                {post.image_url && (
                  <img 
                    src={post.image_url} 
                    alt="Post image"
                    className="w-full rounded-lg mb-4"
                  />
                )}
                
                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-hotpink transition-colors">
                    <span>💜</span>
                    <span>{post.likes}</span>
                  </button>
                  <button className="text-gray-400 hover:text-hung transition-colors text-sm">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              {session ? 'Be the first to share your vibes!' : 'Join the community to see posts and share your vibes!'}
            </p>
            {!session && (
              <a href="/auth/signup" className="btn-primary">
                Join the Room
              </a>
            )}
          </div>
        )}
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-4">
            Connect with the HOTMESS community
          </p>
          <div className="flex justify-center space-x-4">
            <span className="text-hotpink font-semibold">#HNHMESS</span>
            <span className="text-hung font-semibold">#HOTMESSLDN</span>
            <span className="text-hotpink font-semibold">#HUNG</span>
          </div>
        </div>
      </div>
    </section>
  )
}