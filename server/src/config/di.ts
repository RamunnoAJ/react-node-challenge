import DIContainer, { object, factory, use } from 'rsdi'
import fs from 'fs'
import session from 'express-session'
import jwt from 'jsonwebtoken'

import {
  UserController,
  UserRepository,
  UserService,
} from '../module/user/module'
import {
  CardController,
  CardRepository,
  CardService,
} from '../module/card/module'

function configureUsersJSONDatabase() {
  return process.env.USERS_JSON_DB_PATH
}

function configureCardsJSONDatabase() {
  return process.env.CARDS_JSON_DB_PATH
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
    UsersJSONDatabase: factory(() => configureUsersJSONDatabase()),
    CardsJSONDatabase: factory(() => configureCardsJSONDatabase()),
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

function addCardDefinitions(container: DIContainer) {
  container.add({
    CardRepository: object(CardRepository).construct(
      use('fs'),
      use('CardsJSONDatabase'),
      use('jwt'),
    ),
    CardService: object(CardService).construct(use('CardRepository')),
    CardController: object(CardController).construct(use('CardService')),
  })
}

export function configureDI() {
  const container: DIContainer = new DIContainer()
  addCommonDefinitions(container)
  addUserDefinitions(container)
  addCardDefinitions(container)

  return container
}
