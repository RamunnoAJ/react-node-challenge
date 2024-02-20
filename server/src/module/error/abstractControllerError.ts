export class AbstractControllerError extends Error {
  constructor() {
    super(
      'You should not be able to create an instance of AbstractController directly',
    )
  }
}
