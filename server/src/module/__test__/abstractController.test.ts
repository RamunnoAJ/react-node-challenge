const AbstractController = require('../abstractController')
const AbstractControllerError = require('../error/abstractControllerError')

test("You shouldn't be able to create a new instance of AbstractController directly", () => {
  try {
    new AbstractController()
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractControllerError)
  }
})

test('You should be able to create a new instance from a class that inherits from AbstractController', () => {
  const ConcreteController = class extends AbstractController {}
  expect(new ConcreteController()).toBeInstanceOf(ConcreteController)
})
