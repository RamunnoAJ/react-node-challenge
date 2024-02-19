import { Application } from 'express'
import { CardController } from './controller/cardController'
import { CardRepository } from './repository/json/cardRepository'
import { CardService } from './service/cardService'

function init(app: Application, container: any) {
  const controller = container.get('CardController')
  controller.configureRoutes(app)
}

export { init, CardController, CardService, CardRepository }
