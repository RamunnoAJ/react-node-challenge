import { create } from 'zustand'

type Comsuption = {
  totalComsumption: number
}

export type Card = {
  id: string
  country: string
  dateStart: string
  dateEnd: string
  flag: string
  comsuption: Comsuption | null
  plan: string
  userId: string
  status: 'Active' | 'Pending' | 'Expired'
}

export type CardsStore = {
  cards: Card[]
  setCards: (cards: Card[]) => void
}

const useCardsStore = create<CardsStore>(set => ({
  cards: [],
  setCards: cards => set({ cards }),
}))

export default useCardsStore
