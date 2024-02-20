import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SessionProvider from '@/components/Providers/SessionProvider'
import { QueryProvider } from '@/components/Providers/QueryProvider'
import Toast from '@/components/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Holafly Challenge',
  description: 'Next.js Frontend challenge',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <QueryProvider>
            <Toast />
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
