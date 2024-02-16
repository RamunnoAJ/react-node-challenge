const AbstractControllerError = require('./error/abstractControllerError')

module.exports = class AbstractController {
  constructor() {
    if (this.constructor === AbstractController) {
      throw new AbstractControllerError()
    }
  }
}
