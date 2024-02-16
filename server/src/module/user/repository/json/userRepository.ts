import { AbstractUserRepository } from '../abstractUserRepository'
import { UserNotFoundError } from '../error/userNotFoundError'
import { User } from '../../entity/user'

export class UserRepository extends AbstractUserRepository {
  dbFilePath: string
  fileSystem: string
  constructor(fileSystem: string, dbFilePath: string) {
    super()
    this.fileSystem = fileSystem
    this.dbFilePath = dbFilePath
  }

  async getByID(id: string): Promise<User> {
    const users = await this.getAll()

    const user = users.find((tmpUser: User) => tmpUser.id === id)

    if (!user) {
      throw new UserNotFoundError(`User with id ${id} not found`)
    }

    return new User(user)
  }

  async getAll(): Promise<User[]> {
    const users = await this.getAll()
    return users.map((user: User) => new User(user))
  }
}
