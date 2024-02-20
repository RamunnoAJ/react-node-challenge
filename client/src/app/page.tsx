'use client'

import EsimCard from '@/components/EsimCard'
import Navbar from '@/components/Navbar'
import { useGetCards } from '@/hooks/useGetCards'
import useCardsStore from '@/stores/useCardsStore'
import { useEffect } from 'react'

export default function Home() {
  const cards = useCardsStore(state => state.cards)
  const { isLoading, refetch } = useGetCards()

  useEffect(() => {
    refetch()
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center w-full'>
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {!isLoading && cards.map(card => <EsimCard key={card.id} {...card} />)}
      </div>
    </main>
  )
}
