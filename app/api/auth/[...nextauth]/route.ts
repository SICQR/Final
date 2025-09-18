import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider from 'next-auth/providers/discord'
import { supabase } from '@/lib/supabase'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'discord') {
        // Create or update user in Supabase (if configured)
        if (!supabase) {
          console.log('Supabase not configured, skipping user creation')
          return true
        }

        try {
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          if (!existingUser) {
            // Create new user
            const { error } = await supabase
              .from('users')
              .insert({
                email: user.email,
                username: user.name?.toLowerCase().replace(/\s+/g, '_') || 'user',
                full_name: user.name,
                avatar_url: user.image,
                total_scans: 0,
                total_earnings: 0,
                badges: []
              })

            if (error) {
              console.error('Error creating user:', error)
              return false
            }
          }
          
          return true
        } catch (error) {
          console.error('Auth error:', error)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user?.email && supabase) {
        // Get user data from Supabase
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .single()

        if (userData) {
          session.user.id = userData.id
          session.user.username = userData.username
          session.user.totalScans = userData.total_scans
          session.user.totalEarnings = userData.total_earnings
          session.user.badges = userData.badges
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }