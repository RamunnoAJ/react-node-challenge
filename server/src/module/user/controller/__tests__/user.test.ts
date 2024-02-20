import { UserController, UserService } from '../../module'
import { InvalidUserOrPasswordError } from '../error/invalidUserOrPassword'
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

class MockUserService extends UserService {
  async generateToken(user: any): Promise<string> {
    return 'mock_token'
  }
}

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
        post: jest.fn(),
      } as any

      userController.configureRoutes(app)

      expect(app.get).toHaveBeenCalledWith(
        '/users',
        expect.any(Function),
        expect.any(Function),
      )
      expect(app.get).toHaveBeenCalledWith(
        '/users/:id',
        expect.any(Function),
        expect.any(Function),
      )
      expect(app.post).toHaveBeenCalledWith(
        '/users/login',
        expect.any(Function),
      )
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

      await userController.getByID(mockRequestWithParams, mockResponse)

      expect(mockUserService.getByID).not.toHaveBeenCalled()
      expect(mockResponse.send).toHaveBeenCalledWith({
        user: null,
        errors: [UserIdNotDefinedError.name],
      })
      expect(mockResponse.session.errors).toEqual([])
    })
  })

  describe('login', () => {
    let userController: UserController
    let mockRequest: any
    let mockResponse: any

    beforeEach(() => {
      const mockUserRepository = {
        getAll: jest.fn(),
        getByID: jest.fn(),
        generateToken: jest.fn(),
      }
      const mockUserService = new MockUserService(mockUserRepository)
      userController = new UserController(mockUserService)

      mockRequest = {
        body: { username: 'test_user', password: 'test_password' },
      }

      mockResponse = {
        send: jest.fn(),
      }
    })

    it('should return a token when valid credentials are provided', async () => {
      const mockUser = { username: 'test_user', password: 'test_password' }
      userController.userService.getAll = jest
        .fn()
        .mockResolvedValue([mockUser])

      await userController.login(mockRequest as any, mockResponse as any)

      expect(mockResponse.send).toHaveBeenCalledWith({
        token: 'mock_token',
        user: mockUser,
      })
    })

    it('should throw an error when invalid credentials are provided', async () => {
      userController.userService.getAll = jest.fn().mockResolvedValue([])

      await userController.login(mockRequest, mockResponse)

      expect(mockResponse.send).toHaveBeenCalledWith({
        token: null,
        errors: ['Invalid username or password'],
      })
    })
  })
})
