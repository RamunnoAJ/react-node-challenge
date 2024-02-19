import { AbstractUserRepository } from '../abstractUserRepository'
import { AbstractUserRepositoryError } from '../error/abstractUserRepositoryError'

test('Cannot instanciate the repository of abstract class user', () => {
  let repoInstance
  try {
    repoInstance = new AbstractUserRepository()
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractUserRepositoryError)
  } finally {
    expect(repoInstance).toBeUndefined()
  }
})

test('Can instanciate a concrete repository that inherits from abstract', () => {
  const ConcreteRepository = class extends AbstractUserRepository {}
  const repositoryInstance = new ConcreteRepository()
  expect(repositoryInstance).toBeInstanceOf(ConcreteRepository)
  expect(repositoryInstance).toBeInstanceOf(AbstractUserRepository)
})
