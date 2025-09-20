import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for our database tables
export interface Drop {
  id: string
  title: string
  description: string
  price: number
  image_url: string
  category: 'raw' | 'hung' | 'high' | 'super'
  in_stock: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image_url: string
  capacity: number
  attendees: number
  created_at: string
  updated_at: string
}

export interface CommunityPost {
  id: string
  user_id: string
  content: string
  image_url?: string
  likes: number
  created_at: string
  updated_at: string
  user: {
    username: string
    avatar_url?: string
  }
}

export interface UserProfile {
  id: string
  email: string
  username: string
  full_name?: string
  avatar_url?: string
  bio?: string
  location?: string
  website?: string
  total_scans: number
  total_earnings: number
  badges: string[]
  created_at: string
  updated_at: string
}

// Database functions
export const dropService = {
  async getAll() {
    if (!supabase) {
      // Return mock data if Supabase not configured
      return [
        {
          id: '1',
          title: 'HOTMESS RAW Tee',
          description: 'Essential raw energy tee',
          price: 45,
          image_url: '/placeholder-product.jpg',
          category: 'raw' as const,
          in_stock: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ] as Drop[]
    }

    const { data, error } = await supabase
      .from('drops')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Drop[]
  },

  async getById(id: string) {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }

    const { data, error } = await supabase
      .from('drops')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Drop
  }
}

export const eventService = {
  async getAll() {
    if (!supabase) {
      // Return mock data
      return [] as Event[]
    }

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
    
    if (error) throw error
    return data as Event[]
  },

  async getUpcoming() {
    if (!supabase) {
      // Return mock data
      return [] as Event[]
    }

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true })
      .limit(6)
    
    if (error) throw error
    return data as Event[]
  }
}

export const communityService = {
  async getPosts(limit = 10) {
    if (!supabase) {
      // Return mock data
      return [] as CommunityPost[]
    }

    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        user:user_id (
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data as CommunityPost[]
  }
}