import { Application, Request, Response } from 'express'
import { AbstractController } from '../../abstractController'
import { CardService } from '../service/cardService'
import { CardUserIdNotDefinedError } from './error/cardUserIdNotDefinedError'

export class CardController extends AbstractController {
  ROUTE_BASE: string
  cardService: CardService

  constructor(cardService: CardService) {
    super()
    this.ROUTE_BASE = '/cards'
    this.cardService = cardService
  }

  configureRoutes(app: Application) {
    const ROUTE = this.ROUTE_BASE

    app.get(`${ROUTE}/:id`, this.verify.bind(this), this.getByUser.bind(this))
  }

  async getByUser(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
      res.send({ cards: null, errors: [CardUserIdNotDefinedError.name] })
      return
    }

    const cards = await this.cardService.getCardsByUser(id)
    const { errors } = req.session

    res.send({ cards, errors })
    req.session.errors = []
  }

  async verify(req: any, res: Response, next: Function) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).send()
    }

    const token = authHeader.split(' ')[1]
    this.cardService.cardRepository.jwt.verify(
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
