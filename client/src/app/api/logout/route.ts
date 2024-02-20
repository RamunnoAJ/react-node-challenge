import { cookies } from 'next/headers'

export async function GET() {
  cookies().delete('next-auth.session-token')
  cookies().delete('next-auth.csrf-token')

  return Response.redirect(`${process.env.NEXTAUTH_URL}/login`)
}
