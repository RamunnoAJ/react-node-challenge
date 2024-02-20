import { AbstractUserRepository } from '../abstractUserRepository'
import { UserNotFoundError } from '../error/userNotFoundError'
import { User } from '../../entity/user'

export class UserRepository extends AbstractUserRepository {
  dbFilePath: string
  fileSystem: any
  jwt: any
  constructor(fileSystem: any, dbFilePath: string, jwt: any) {
    super()
    this.fileSystem = fileSystem
    this.dbFilePath = dbFilePath
    this.jwt = jwt
  }

  async getByID(id: string): Promise<User> {
    const users = this.getData()

    const user = users.find((tmpUser: User) => tmpUser.id === id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return new User(user)
  }

  async getAll(): Promise<User[]> {
    return this.getData().map((user: User) => new User(user))
  }

  async generateToken(user: User) {
    return await this.jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    )
  }

  getData(): User[] {
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
