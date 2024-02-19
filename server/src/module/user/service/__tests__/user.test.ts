import { User } from '../../entity/user'
import { UserIdNotDefinedError } from '../error/userIdNotDefinedError'
import { UserNotDefinedError } from '../error/userNotDefinedError'
import { UserService } from '../userService'

const mockUserRepository = {
  getAll: jest.fn(),
  getByID: jest.fn(),
}

// Mock User entity for testing
class MockUser extends User {
  constructor(id: string) {
    super({
      id,
      username: 'username',
      email: 'email',
      password: 'password',
    })
    this.id = id
  }
}

describe('UserService', () => {
  let userService: UserService

  beforeEach(() => {
    userService = new UserService(mockUserRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all users', async () => {
    const mockUsers: User[] = [new MockUser('1'), new MockUser('2')]
    mockUserRepository.getAll.mockResolvedValueOnce(mockUsers)

    const users = await userService.getAll()

    expect(users).toEqual(mockUsers)
    expect(mockUserRepository.getAll).toHaveBeenCalled()
  })

  it('should return user by ID if found', async () => {
    const mockUser = new MockUser('1')
    mockUserRepository.getByID.mockResolvedValueOnce(mockUser)

    const user = await userService.getByID('1')

    expect(user).toEqual(mockUser)
    expect(mockUserRepository.getByID).toHaveBeenCalledWith('1')
  })

  it('should throw UserIdNotDefinedError when ID is not provided', async () => {
    await expect(userService.getByID('')).rejects.toThrow(UserIdNotDefinedError)
    expect(mockUserRepository.getByID).not.toHaveBeenCalled()
  })

  it('should throw UserNotDefinedError when user by ID not found', async () => {
    mockUserRepository.getByID.mockResolvedValueOnce(null)

    await expect(userService.getByID('1')).rejects.toThrow(UserNotDefinedError)
    expect(mockUserRepository.getByID).toHaveBeenCalledWith('1')
  })
})
