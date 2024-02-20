import { User } from '../../entity/user'
import { UserIdNotDefinedError } from '../error/userIdNotDefinedError'
import { UserNotDefinedError } from '../error/userNotDefinedError'
import { UserService } from '../userService'

const mockUserRepository = {
  getAll: jest.fn(),
  getByID: jest.fn(),
  async generateToken(user: User): Promise<any> {
    return 'mock_token'
  },
}

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
  let mockUser: User

  beforeEach(() => {
    userService = new UserService(mockUserRepository)

    mockUser = {
      id: '1',
      username: 'username',
      email: 'email',
      password: 'password',
    }
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

  it('should resolve to UserIdNotDefinedError when ID is not provided', async () => {
    await expect(userService.getByID('')).resolves.toEqual(
      new UserIdNotDefinedError(),
    )
    expect(mockUserRepository.getByID).not.toHaveBeenCalled()
  })

  it('should resolve to UserNotDefinedError when user by ID not found', async () => {
    mockUserRepository.getByID.mockResolvedValueOnce(null)

    await expect(userService.getByID('1')).resolves.toEqual(
      new UserNotDefinedError(),
    )
    expect(mockUserRepository.getByID).toHaveBeenCalledWith('1')
  })

  it('should return a token when valid user is provided', async () => {
    const token = await userService.generateToken(mockUser)

    expect(token).toEqual('mock_token')
  })
})
