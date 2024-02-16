import { UserController } from '../userController'
import { UserIdNotDefinedError } from '../error/userIdNotDefinedError'
import { Request, Response } from 'express'

const serviceMock = {
  getAll: jest.fn(),
  getByID: jest.fn(),
}

const controller = new UserController(serviceMock)

test('Should get all users', async () => {
  const sendMock = jest.fn()

  const req = { session: { errors: [] } } as Request
  const res = { send: sendMock } as unknown as Response

  await controller.getAll(req, res)

  expect(sendMock).toHaveBeenCalledTimes(1)
  expect(sendMock).toHaveBeenCalledWith({ users: [] })
})

test('Should get the user', async () => {
  const MOCK_ID = '1'
  serviceMock.getByID.mockImplementation(() => {
    throw Error('example')
  })

  const redirectMock = jest.fn()
  const req = {
    params: { id: MOCK_ID },
    session: { errors: [] },
  } as unknown as Request
  const res = { redirect: redirectMock } as unknown as Response

  await controller.getByID(req, res)

  expect(redirectMock).toHaveBeenCalledTimes(1)
  expect(req.session.errors).not.toEqual([])
})

test('Should throw an error when user id is not defined', async () => {
  expect(
    controller.getByID(
      { params: {} } as unknown as Request,
      {} as unknown as Response,
    ),
  ).rejects.toThrow(UserIdNotDefinedError)
})
