import { Card } from '../entity/card'
import { CardRepository } from '../repository/json/cardRepository'
import { CardNotFoundError } from './error/cardNotFoundError'
import { CardUserIdNotDefinedError } from './error/cardUserIdNotDefinedError'

export class CardService {
  cardRepository: CardRepository
  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository
  }

  async getAll(): Promise<Card[]> {
    const cards = await this.cardRepository.getAll()
    return cards
  }

  async getCardsByUser(userId: string): Promise<Card[]> {
    if (!userId) {
      throw new CardUserIdNotDefinedError()
    }

    const cards = await this.cardRepository.getCardsByUser(userId)

    if (!cards) {
      throw new CardNotFoundError()
    }

    return cards
  }
}
