import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Simple admin credentials - In production, use database
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@portfolio.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Simple admin check - In production, verify against database
        if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
          return {
            id: "1",
            email: ADMIN_EMAIL,
            name: "Admin",
            role: "admin"
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  }
}
