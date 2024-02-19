import { AbstractCardRepositoryError } from './error/abstractCardRepositoryError'
import { Card } from '../entity/card'
import { CardUserIdNotDefinedError } from './error/cardUserIdNotDefinedError'
import { CardNotFoundError } from './error/cardNotFoundError'

export class AbstractCardRepository {
  constructor() {
    if (new.target === AbstractCardRepository) {
      throw new AbstractCardRepositoryError(
        'Cannot initialize the repository of abstract class card',
      )
    }
  }

  async getCardsByUser(userId: string): Promise<Card[]> {
    if (!userId) {
      throw new CardUserIdNotDefinedError()
    }

    const card = await this.getAll().then(cards => {
      return cards.filter(card => card.userId === userId)
    })

    if (!card) {
      throw new CardNotFoundError()
    }

    return card
  }

  async getAll(): Promise<Card[]> {
    const cards = await this.getAll()
    return cards
  }
}
