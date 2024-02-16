import { AbstractControllerError } from './error/abstractControllerError'

export class AbstractController {
  constructor() {
    if (this.constructor === AbstractController) {
      throw new AbstractControllerError()
    }
  }
}
