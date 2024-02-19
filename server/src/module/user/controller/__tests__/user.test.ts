import { UserController } from '../../module'
import { UserIdNotDefinedError } from '../error/userIdNotDefinedError'

const mockUserService: any = {
  getAll: jest.fn(),
  getByID: jest.fn(),
}

const mockRequest = {
  session: { errors: [] },
} as any
const mockResponse = {
  send: jest.fn(),
  status: jest.fn().mockReturnThis(),
  session: { errors: [] },
} as any

describe('UserController', () => {
  let userController: UserController

  beforeEach(() => {
    userController = new UserController(mockUserService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('configureRoutes', () => {
    it('should configure routes for getAll and getByID', () => {
      const app = {
        get: jest.fn(),
      } as any

      userController.configureRoutes(app)

      expect(app.get).toHaveBeenCalledWith('/users', expect.any(Function))
      expect(app.get).toHaveBeenCalledWith('/users/:id', expect.any(Function))
    })
  })

  describe('getAll', () => {
    it('should get all users and send response', async () => {
      const mockUsers = [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' },
      ]
      mockUserService.getAll.mockResolvedValueOnce(mockUsers)

      await userController.getAll(mockRequest, mockResponse)

      expect(mockUserService.getAll).toHaveBeenCalled()
      expect(mockResponse.send).toHaveBeenCalledWith({
        users: mockUsers,
        errors: [],
      })
      expect(mockResponse.session.errors).toEqual([])
    })
  })

  describe('getByID', () => {
    it('should get user by ID and send response', async () => {
      const mockUser = { id: 1, username: 'user1' }
      mockUserService.getByID.mockResolvedValueOnce(mockUser)
      const mockRequestWithParams = { ...mockRequest, params: { id: '1' } }

      await userController.getByID(mockRequestWithParams, mockResponse)

      expect(mockUserService.getByID).toHaveBeenCalledWith('1')
      expect(mockResponse.send).toHaveBeenCalledWith({
        user: mockUser,
        errors: [],
      })
      expect(mockResponse.session.errors).toEqual([])
    })

    it('should throw UserIdNotDefinedError if ID is not provided', async () => {
      const mockRequestWithParams = { ...mockRequest, params: {} }

      await expect(
        userController.getByID(mockRequestWithParams, mockResponse),
      ).rejects.toThrow(UserIdNotDefinedError)
      expect(mockUserService.getByID).not.toHaveBeenCalled()
      expect(mockResponse.send).not.toHaveBeenCalled()
      expect(mockResponse.session.errors).toEqual([])
    })
  })
})
