import LoginForm from '@/components/Login/Form'

export default function LoginPage() {
  return (
    <main className='flex min-h-screen items-center justify-center p-24 bg-gray-100'>
      <div className='w-full shadow max-w-md text-black bg-white border-2 border-gray-200'>
        <div className='flex flex-col py-8 px-10 gap-2'>
          <h1 className='font-bold leading-tight tracking-tight text-gray-900 text-2xl'>
            Inicia Sesión
          </h1>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
