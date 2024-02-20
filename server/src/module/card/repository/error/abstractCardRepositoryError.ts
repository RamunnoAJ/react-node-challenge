export class AbstractCardRepositoryError extends Error {
  constructor() {
    super('Cannot initialize the repository of abstract class card')
  }
}
