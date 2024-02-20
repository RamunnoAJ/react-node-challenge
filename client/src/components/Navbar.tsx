'use client'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const session: any = useSession()

  return (
    <nav className='w-full bg-white border-b border-gray-200 py-2.5'>
      <div className='container flex flex-wrap items-center justify-between mx-auto px-4'>
        <span className='self-center text-xl font-semibold whitespace-nowrap'>
          Holafly
        </span>
        <div className='flex gap-12 items-center'>
          <span>Usuario: {session.data?.user?.username}</span>
          <button
            onClick={() => signOut()}
            className='text-red-500 hover:underline font-semibold'>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}
