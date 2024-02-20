import LoginForm from '@/components/Login/Form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]'

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Record<string, string>
}) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return (
    <main className='flex min-h-screen items-center justify-center p-6 md:p-24 bg-gray-100'>
      <div className='w-full shadow max-w-md text-black bg-white border-2 border-gray-200'>
        <div className='flex flex-col py-8 px-10 gap-2'>
          <h1 className='font-bold leading-tight tracking-tight text-gray-900 text-2xl'>
            Inicia Sesión
          </h1>
          {searchParams?.error && (
            <p className='text-red-500'>Usuario o contraseña incorrectos</p>
          )}
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
