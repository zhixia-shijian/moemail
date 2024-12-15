import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { createDb } from "./db"
import { accounts, sessions, users } from "./schema"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth(() => {
  return {
    secret: process.env.AUTH_SECRET,
    adapter: DrizzleAdapter(createDb(), {   
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,  
    }),
    providers: [
      GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
      })
    ],
  }
})
