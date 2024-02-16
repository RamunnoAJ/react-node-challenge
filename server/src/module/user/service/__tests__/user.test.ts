import { UserService } from '../userService'
import { UserIdNotDefinedError } from '../error/userIdNotDefinedError'

const repositoryMock = {
  getAll: jest.fn(),
  getByID: jest.fn(),
}

const service = new UserService(repositoryMock)

test('Get a user by ID calls the method get from the repository once', async () => {
  service.getByID('1')
  expect(repositoryMock.getByID).toHaveBeenCalledTimes(1)
})

test('Get a user by ID without giving an ID throws an specific error', async () => {
  expect(service.getByID).toThrow(UserIdNotDefinedError)
})

test('Get all users calls the method getAll from the repository once', async () => {
  service.getAll()
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1)
})
