import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username?: string
      totalScans?: number
      totalEarnings?: number
      badges?: string[]
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    username?: string
    totalScans?: number
    totalEarnings?: number
    badges?: string[]
  }
}