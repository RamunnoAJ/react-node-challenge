import { AbstractCardRepository } from '../abstractCardRepository'
import { AbstractCardRepositoryError } from '../error/abstractCardRepositoryError'

test('Cannot instanciate the repository of abstract class card', () => {
  let repoInstance
  try {
    repoInstance = new AbstractCardRepository()
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractCardRepositoryError)
  } finally {
    expect(repoInstance).toBeUndefined()
  }
})

test('Can instanciate a concrete repository that inherits from abstract', () => {
  const ConcreteRepository = class extends AbstractCardRepository {}
  const repositoryInstance = new ConcreteRepository()
  expect(repositoryInstance).toBeInstanceOf(ConcreteRepository)
  expect(repositoryInstance).toBeInstanceOf(AbstractCardRepository)
})
