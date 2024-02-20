export class InvalidUserOrPasswordError extends Error {
  constructor() {
    super('Invalid user or password')
  }
}
