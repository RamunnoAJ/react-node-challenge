import { AbstractUserRepository } from '../abstractUserRepository'
import { AbstractUserRepositoryError } from '../error/abstractUserRepositoryError'

test('Cannot initialize the repository of abstract class user', () => {
  let repoInstance

  try {
    repoInstance = new AbstractUserRepository()
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractUserRepositoryError)
  } finally {
    expect(repoInstance).toBeUndefined()
  }
})

test('Can initialize the concrete repository that inherits from the abstract repository', () => {
  const ConcreteRepository = class extends AbstractUserRepository {}
  const repoInstance = new ConcreteRepository()

  expect(repoInstance).toBeInstanceOf(ConcreteRepository)
  expect(repoInstance).toBeInstanceOf(AbstractUserRepository)
})
