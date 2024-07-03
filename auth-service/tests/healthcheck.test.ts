import { StatusCodes } from 'http-status-codes'
import { api, urls } from './setup'

describe("Testing healthcheck endpoint", () => {
  test("healtcheck should return a 200 response", async () => {
    const res = await api.get(urls.healtcheck)
    expect(res.statusCode).toBe(StatusCodes.OK)
  })

  test("healtcheck should return default message", async () => {
    const res = await api.get(urls.healtcheck)
    expect(res.body.message).toBe<string>("Api working perfectly fine")
    expect(res.body.ok).toBe<boolean>(true)
  })
})