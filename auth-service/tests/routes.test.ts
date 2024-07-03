import { start } from '@/server/server'
import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'

const server = start()
export const api = supertest(server)

afterAll(() => {
  server.close()
})

describe("Testing healthcheck endpoint", () => {
  test("healtcheck should return a 200 response", async () => {
    const res = await api.get("/api/v1/test")
    expect(res.statusCode).toBe(StatusCodes.OK)
  })

  test("healtcheck should return default message", async () => {
    const res = await api.get("/api/v1/test")
    expect(res.body.message).toBe<string>("Api working perfectly fine")
    expect(res.body.ok).toBe<boolean>(true)
  })
})

describe("Testing /admin/users endpoint", () => {
  const url = "/api/v1/admin/users"

  test("should returns error if there is no token", async () => {
    const res = await api
      .get(url)
      .expect(StatusCodes.UNAUTHORIZED)

    expect(res.body.message).toBe<string>("Access denied")
  })

  test("should returns error if token is invalid", async () => {
    const res = await api
      .get(url)
      .set("Cookie", ['access_token=foo'])
      .expect(StatusCodes.UNAUTHORIZED)

    expect(res.body.message).toBe<string>("Invalid token")
  })

  test.skip("should fail because of no suficcient role", async () => {
    const mockVerify = jest.fn((_token, _secretOrPublicKey, _options, callback) => {
      return callback(null, { id: 0 });
    });

    (jwt.verify as jest.Mock) = mockVerify

    const res = await api
      .get(url)
      .set("Cookie", ['access_token=foo'])
      .expect(StatusCodes.FORBIDDEN)

    expect(res.body.message).toBe("Forbidden resource")
  })
})