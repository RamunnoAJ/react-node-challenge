'use client'
import React from 'react'
import Input from './Input'
import Form from '../Form'

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
  }

  return (
    <Form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
      <Input
        label='Tu email'
        type='email'
        name='email'
        isRequired={true}
        placeholder='name@company.com'
      />
      <Input
        label='Tu contraseña'
        type='password'
        name='password'
        isRequired={true}
        placeholder='********'
      />
      <button
        type='submit'
        className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-primary-400 rounded-lg text-sm px-5 py-2.5 text-center font-bold hover:bg-primary-700 transition-all ease-in-out duration-300  ${
          isLoading ? 'animate-pulse' : ''
        }`}>
        Iniciar Sesión
      </button>
    </Form>
  )
}
