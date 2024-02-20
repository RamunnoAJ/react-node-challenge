import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!user) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)
  }

  if (user) {
    const isTokenCorrect: any = await fetch(
      `${process.env.NEXT_API_URL}/users/login`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${user.token}`,
        },
      },
    )

    if (isTokenCorrect.errors) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)
    }

    const authToken = user.token
    req.headers.set('Authorization', `Bearer ${authToken}`)

    return NextResponse.next()
  } else {
    return NextResponse.next()
  }
}

export const config = { matcher: ['/'] }
