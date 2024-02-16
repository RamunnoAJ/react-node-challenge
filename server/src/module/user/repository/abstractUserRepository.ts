import { User } from '../entity/user'
import { AbstractUserRepositoryError } from './error/abstractUserRepositoryError'
import { UserNotFoundError } from './error/userNotFoundError'

export class AbstractUserRepository {
  constructor() {
    if (new.target === AbstractUserRepository) {
      throw new AbstractUserRepositoryError(
        'Cannot initialize the repository of abstract class user',
      )
    }
  }

  async getByID(id: string): Promise<User> {
    if (!id) {
    }

    const user = await this.getAll().then(users => {
      return users.find(user => user.id === id)
    })

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }

  async getAll(): Promise<User[]> {
    const users = await this.getAll()
    return users
  }
}
