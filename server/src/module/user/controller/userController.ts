import { Request, Response, Application } from 'express'
import { AbstractController } from '../../abstractController'
import { UserIdNotDefinedError } from './error/userIdNotDefinedError'
import { UserService } from '../module'
import { InvalidUserOrPasswordError } from './error/invalidUserOrPassword'

export class UserController extends AbstractController {
  ROUTE_BASE: string
  userService: UserService

  constructor(userService: UserService) {
    super()
    this.ROUTE_BASE = '/users'
    this.userService = userService
  }

  configureRoutes(app: Application) {
    const ROUTE = this.ROUTE_BASE

    app.get(`${ROUTE}`, this.verify.bind(this), this.getAll.bind(this))
    app.get(`${ROUTE}/:id`, this.verify.bind(this), this.getByID.bind(this))
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
      res.send({ user: null, errors: [UserIdNotDefinedError.name] })
      return
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
      res.send({ token: null, errors: [InvalidUserOrPasswordError.name] })
      return
    }

    const user = users.find(
      (user: any) => user.username === username && user.password === password,
    )

    if (!user) {
      res.send({ token: null, errors: ['Invalid username or password'] })
      return
    }

    const token = await this.userService.generateToken(user)

    res.send({ token })
  }

  async verify(req: any, res: Response, next: Function) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).send()
    }

    const token = authHeader.split(' ')[1]
    this.userService.userRepository.jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: any, user: any) => {
        if (err) {
          return res.status(403).json('Token is not valid!')
        }

        req.use = user
        next()
      },
    )
  }
}
