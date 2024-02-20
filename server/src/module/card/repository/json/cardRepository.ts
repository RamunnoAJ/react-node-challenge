import { Card } from '../../entity/card'
import { AbstractCardRepository } from '../abstractCardRepository'
import { CardNotFoundError } from '../error/cardNotFoundError'

export class CardRepository extends AbstractCardRepository {
  dbFilePath: string
  fileSystem: any
  jwt: any
  constructor(fileSystem: any, dbFilePath: string, jwt: any) {
    super()
    this.fileSystem = fileSystem
    this.dbFilePath = dbFilePath
    this.jwt = jwt
  }

  async getCardsByUser(userId: string): Promise<Card[] | Error> {
    const cards = this.getData()

    const userCards = cards.filter(card => card.userId === userId)
    if (!userCards) {
      return new CardNotFoundError(`Cards for user ${userId} not found`)
    }

    return userCards.map((card: Card) => new Card(card))
  }

  async getAll(): Promise<Card[]> {
    return this.getData().map((card: Card) => new Card(card))
  }

  getData(): Card[] {
    const content = this.fileSystem.readFileSync(this.dbFilePath, 'utf8')
    let paresedContent
    try {
      paresedContent = JSON.parse(content)
    } catch (e) {
      paresedContent = []
    }
    return paresedContent
  }
}
