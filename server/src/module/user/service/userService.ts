import { User } from '../entity/user'
import { UserIdNotDefinedError } from './error/userIdNotDefinedError'
import { UserNotDefinedError } from './error/userNotDefinedError'
import { UserRepository } from '../module'

export class UserService {
  userRepository: UserRepository
  constructor(userRepository: any) {
    this.userRepository = userRepository
  }

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.getAll()
    return users
  }

  async getByID(id: string): Promise<User> {
    if (!id) {
      throw new UserIdNotDefinedError()
    }

    const user = await this.userRepository.getByID(id)

    if (!user) {
      throw new UserNotDefinedError()
    }

    return user
  }

  async generateToken(user: User) {
    if (!user) {
      throw new UserNotDefinedError()
    }

    const token = await this.userRepository.generateToken(user)

    return token
  }
}
