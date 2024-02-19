import { Request, Response, Application } from 'express'
import { AbstractController } from '../../abstractController'
import { UserIdNotDefinedError } from './error/userIdNotDefinedError'
import { UserService } from '../module'
import { InvalidUserOrPasswordError } from './error/invalidUserOrPassword'

export class UserController extends AbstractController {
  ROUTE_BASE: string
  userService: UserService

  constructor(userService: any) {
    super()
    this.ROUTE_BASE = '/users'
    this.userService = userService
  }

  configureRoutes(app: Application) {
    const ROUTE = this.ROUTE_BASE

    app.get(`${ROUTE}`, this.getAll.bind(this))
    app.get(`${ROUTE}/:id`, this.getByID.bind(this))
    app.post(`${ROUTE}/login`, this.login.bind(this))
  }

  async getAll(req: Request, res: Response) {
    const users = await this.userService.getAll()
    const { errors } = req.session

    res.send({ users, errors })
    req.session.errors = []
  }

  async getByID(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
      throw new UserIdNotDefinedError()
    }

    const user = await this.userService.getByID(id)
    const { errors } = req.session

    res.send({ user, errors })
    req.session.errors = []
  }

  async login(req: Request, res: Response) {
    const users = await this.userService.getAll()
    const { username, password } = req.body
    if (!username || !password) {
      throw new UserIdNotDefinedError()
    }

    const user = users.find(
      (user: any) => user.username === username && user.password === password,
    )

    if (!user) {
      throw new InvalidUserOrPasswordError()
    }

    const token = await this.userService.generateToken(user)

    res.send({ token })
  }
}
