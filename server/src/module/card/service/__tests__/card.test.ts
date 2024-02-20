import { Card } from '../../entity/card'
import { CardRepository } from '../../repository/json/cardRepository'
import { CardService } from '../cardService'
import { CardNotFoundError } from '../error/cardNotFoundError'
import { CardUserIdNotDefinedError } from '../error/cardUserIdNotDefinedError'

describe('CardService', () => {
  let cardService: CardService
  let mockCardRepository: jest.Mocked<CardRepository>

  beforeEach(() => {
    mockCardRepository = {
      getAll: jest.fn(),
      getCardsByUser: jest.fn(),
    } as unknown as jest.Mocked<CardRepository>

    cardService = new CardService(mockCardRepository)
  })

  describe('getAll', () => {
    it('should return all cards', async () => {
      const mockCards: Card[] = [
        { id: '1', name: 'Card 1' },
        { id: '2', name: 'Card 2' },
      ]
      mockCardRepository.getAll.mockResolvedValueOnce(mockCards)

      const result = await cardService.getAll()

      expect(mockCardRepository.getAll).toHaveBeenCalled()
      expect(result).toEqual(mockCards)
    })
  })

  describe('getCardsByUser', () => {
    it('should return cards for a user', async () => {
      const mockUserId = 'user123'
      const mockUserCards: Card[] = [
        { id: '1', name: 'User Card 1' },
        { id: '2', name: 'User Card 2' },
      ]
      mockCardRepository.getCardsByUser.mockResolvedValueOnce(mockUserCards)

      const result = await cardService.getCardsByUser(mockUserId)

      expect(mockCardRepository.getCardsByUser).toHaveBeenCalledWith(mockUserId)
      expect(result).toEqual(mockUserCards)
    })

    it('should resolve to CardUserIdNotDefinedError when user ID is not provided', async () => {
      const userId: string = ''

      await cardService.getCardsByUser(userId)

      await expect(cardService.getCardsByUser(userId)).resolves.toEqual(
        new CardUserIdNotDefinedError(),
      )
    })

    it('should resolve to CardNotFoundError when no cards found for user', async () => {
      const mockUserId = 'user123'
      mockCardRepository.getCardsByUser.mockResolvedValueOnce(null as any)

      await cardService.getCardsByUser(mockUserId)

      await expect(cardService.getCardsByUser(mockUserId)).resolves.toEqual(
        new CardNotFoundError(),
      )
    })
  })
})
