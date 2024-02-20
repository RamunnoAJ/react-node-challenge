import { getByUser } from '@/services/cards'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import useCardsStore from '../stores/useCardsStore'

export const useGetCards = () => {
  const { data: session } = useSession()
  const { token, user }: any = session

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => await getByUser(user?.id, token),
  })

  const setCardsToStore = useCardsStore(state => state.setCards)

  useEffect(() => {
    if (!isLoading && data) {
      setCardsToStore(data.cards)
    }
  }, [data, isLoading])

  return { data, isLoading, refetch }
}
