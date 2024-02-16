import { DIContainer, factory, get, object } from 'rsdi'
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
  container.addDefinitions({
    fs,
    JSONDatabase: factory(configureMainJSONDatabase),
    Session: factory(configureSession),
  })
}

function addUserModuleDefinitions(container: any) {
  container.addDefinitions({
    UserController: object(UserController).construct(get('UserService')),
    UserService: object(UserService).construct(container.get('UserRepository')),
    UserRepository: object(UserRepository).construct(
      get('fs'),
      get('JSONDatabase'),
    ),
  })
}

export function configureDI() {
  const container = new DIContainer()
  addCommonDefinitions(container)
  addUserModuleDefinitions(container)

  return container
}
