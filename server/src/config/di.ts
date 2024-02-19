import DIContainer, { object, factory, use } from 'rsdi'
import fs from 'fs'
import session from 'express-session'
import jwt from 'jsonwebtoken'

import {
  UserController,
  UserRepository,
  UserService,
} from '../module/user/module'

function configureMainJSONDatabase() {
  return process.env.USERS_JSON_DB_PATH
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

function addCommonDefinitions(container: DIContainer) {
  container.add({
    fs: factory(() => fs),
    UsersJSONDatabase: factory(() => configureMainJSONDatabase()),
    session: factory(() => configureSession()),
    jwt: factory(() => jwt),
  })
}

function addUserDefinitions(container: DIContainer) {
  container.add({
    UserRepository: object(UserRepository).construct(
      use('fs'),
      use('UsersJSONDatabase'),
      use('jwt'),
    ),
    UserService: object(UserService).construct(use('UserRepository')),
    UserController: object(UserController).construct(use('UserService')),
  })
}

export function configureDI() {
  const container: DIContainer = new DIContainer()
  addCommonDefinitions(container)
  addUserDefinitions(container)

  return container
}
