import { createContainer, asFunction, asValue, asClass } from 'awilix'
import fs from 'fs'
import session from 'express-session'

import {
  UserController,
  UserRepository,
  UserService,
} from '../module/user/module'

function configureMainJSONDatabase() {
  return process.env.JSON_DB_PATH
}

function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000

  const sessionOptions = {
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  }

  return session(sessionOptions)
}

function addCommonDefinitions(container: any) {
  container.register({
    fs: asValue(fs),
    JSONDatabase: asFunction(configureMainJSONDatabase),
    Session: asFunction(configureSession),
  })
}

function addUserModuleDefinitions(container: any) {
  container.register({
    UserRepository: asClass(UserRepository).inject(() => ({
      fs: container.resolve('fs'),
      JSONDatabase: container.resolve('JSONDatabase'),
    })),
    UserService: asClass(UserService).inject(() => ({
      userRepository: container.resolve('UserRepository'),
    })),
    UserController: asClass(UserController).inject(() => ({
      userService: container.resolve('UserService'),
    })),
  })
}

export function configureDI() {
  const container = createContainer()
  addCommonDefinitions(container)
  addUserModuleDefinitions(container)

  return container
}
