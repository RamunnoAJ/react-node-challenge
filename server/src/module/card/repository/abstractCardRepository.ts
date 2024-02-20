import { AbstractCardRepositoryError } from './error/abstractCardRepositoryError'
import { Card } from '../entity/card'
import { CardUserIdNotDefinedError } from './error/cardUserIdNotDefinedError'
import { CardNotFoundError } from './error/cardNotFoundError'

export class AbstractCardRepository {
  constructor() {
    if (new.target === AbstractCardRepository) {
      throw new AbstractCardRepositoryError()
    }
  }

  async getCardsByUser(userId: string): Promise<Card[] | Error> {
    if (!userId) {
      return new CardUserIdNotDefinedError()
    }

    const card = await this.getAll().then(cards => {
      return cards.filter(card => card.userId === userId)
    })

    if (!card) {
      return new CardNotFoundError()
    }

    return card
  }

  async getAll(): Promise<Card[]> {
    const cards = await this.getAll()
    return cards
  }
}
