import { CardController } from '../cardController'
import { CardUserIdNotDefinedError } from '../error/cardUserIdNotDefinedError'

describe('CardController', () => {
  let mockCardService: any
  let cardController: any

  beforeEach(() => {
    mockCardService = {
      getCardsByUser: jest.fn(),
      cardRepository: {
        jwt: {
          verify: jest.fn(),
        },
      },
    }
    cardController = new CardController(mockCardService)
  })

  describe('getByUser', () => {
    it('should throw an error if userId is not defined', async () => {
      const req = { params: {} }
      const res = { send: jest.fn() }

      await expect(cardController.getByUser(req, res)).rejects.toThrow(
        CardUserIdNotDefinedError,
      )
    })

    it('should send cards and errors if userId is defined', async () => {
      const req = { params: { userId: 'testUserId' }, session: { errors: [] } }
      const res = { send: jest.fn() }
      const mockCards = [
        { id: 1, name: 'Card 1' },
        { id: 2, name: 'Card 2' },
      ]
      mockCardService.getCardsByUser.mockResolvedValue(mockCards)

      await cardController.getByUser(req, res)

      expect(res.send).toHaveBeenCalledWith({ cards: mockCards, errors: [] })
    })
  })

  describe('verify', () => {
    it('should return 401 if authorization header is missing', () => {
      const req = {
        headers: {},
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      }
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
      const next = jest.fn()

      cardController.verify(req, res, next)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalled()
      expect(next).not.toHaveBeenCalled()
    })

    it('should return 403 if token is not valid', () => {
      const req = {
        headers: { authorization: 'Bearer invalidToken' },
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      const next = jest.fn()
      mockCardService.cardRepository.jwt.verify.mockImplementation(
        (token: any, secret: any, callback: any) => {
          callback(new Error('Invalid token'))
        },
      )

      cardController.verify(req, res, next)

      expect(res.status).toHaveBeenCalledWith(403)
      expect(res.json).toHaveBeenCalledWith('Token is not valid!')
      expect(next).not.toHaveBeenCalled()
    })

    it('should call next if token is valid', () => {
      const req = { headers: { authorization: 'Bearer validToken' }, use: null }
      const res = {}
      const next = jest.fn()
      mockCardService.cardRepository.jwt.verify.mockImplementation(
        (token: any, secret: any, callback: any) => {
          callback(null, { username: 'testUser' })
        },
      )

      cardController.verify(req, res, next)

      expect(req.use).toEqual({ username: 'testUser' })
      expect(next).toHaveBeenCalled()
    })
  })
})
