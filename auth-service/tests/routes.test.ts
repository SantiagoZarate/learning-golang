import { app, start } from '@/server/server'
import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'

const server = start()

const api = supertest(server)

afterAll(() => {
  server.close()
})

test("First test ever written", () => {
  expect(true).toBeTruthy()
})

test("healtcheck should return a 200 response", async () => {
  const res = await api.get("/api/v1/test")
  expect(res.statusCode).toBe(StatusCodes.OK)
})