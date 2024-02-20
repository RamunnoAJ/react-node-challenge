export class CardNotFoundError extends Error {
  constructor(message = 'Card not found') {
    super(message)
  }
}
