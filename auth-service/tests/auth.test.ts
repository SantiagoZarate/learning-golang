import { StatusCodes } from 'http-status-codes'
import { api } from './routes.test'

describe("testing /api/v1/auth/register routes", () => {
  const url = "/api/v1/auth/register"

  test("should return a response with the credentials passed", async () => {
    const body = { username: "santi24", password: "contraseña8", email: "santi24@gmail.com" }

    const res = await api
      .post(url)
      .send(body)
      .expect(StatusCodes.OK)

    expect(res.body.message).toBe<string>("Registered succesfully")
  })
})




