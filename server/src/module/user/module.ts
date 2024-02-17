import { Application } from 'express'
import { UserController } from './controller/userController'
import { UserRepository } from './repository/json/userRepository'
import { UserService } from './service/userService'

function init(app: Application, container: any) {
  const controller = container.resolve('UserController')
  controller.configureRoutes(app)
}

export { init, UserController, UserService, UserRepository }
