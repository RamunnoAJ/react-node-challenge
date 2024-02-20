import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const API_URL = process.env.NEXT_API_URL

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
          const { username, password } = credentials
          const data = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          })
          const userToken = await data.json()

          const userData = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
              authorization: `Bearer ${userToken.token}`,
            },
          })
          const user = await userData.json()

          if (user.error) {
            return null
          }

          return {
            ...userToken,
          }
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      return { ...session, ...token }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
