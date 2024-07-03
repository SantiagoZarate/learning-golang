import { start } from '@/server/server'
import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import db from '@/db/db'
import user from '@/resources/user/schema'

const server = start()
export const api = supertest(server)

afterAll(() => {
  server.close()
})

afterEach(async () => {
  await (await db)!.delete(user)
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

describe("testing /api/v1/auth/register endpoint", () => {

  const url = "/api/v1/auth/register"
  const body = { username: "santi24", password: "contraseña8", email: "santi24@gmail.com" }

  test("should return a response with the credentials passed", async () => {
    return await api
      .post(url)
      .send(body)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(StatusCodes.OK)
      .then(response => {
        expect(response.body.results).toBe(1)
        expect(response.body.message).toStrictEqual("Registered succesfully")
      })
  })

  test("should return error for duplicated credentials", async () => {
    await api
      .post(url)
      .send(body)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(StatusCodes.OK)

    return await api
      .post(url)
      .send(body)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(StatusCodes.UNAUTHORIZED)
  })

  test("should registers all 3 users", async () => {
    const newUsers = [
      { username: "user1", password: "password", email: "user1@gmail.com" },
      { username: "user2", password: "password", email: "user2@gmail.com" },
      { username: "user3", password: "password", email: "user3@gmail.com" }
    ]

    const promises = newUsers.map((user) =>
      api
        .post(url)
        .send(user)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .expect(StatusCodes.OK)
        .then(response => {
          expect(response.body.results).toBeDefined();
          expect(response.body.message).toStrictEqual("Registered succesfully");
        })
    );

    await Promise.all(promises);
  })
})

describe("testing /api/v1/auth/login endpoint", () => {
  const url = "/api/v1/auth/login"
  const credentials = { username: "user1", password: "password", email: "user1@gmail.com" }

  test("login with correct credentials should return access token through header", async () => {
    await api
      .post("/api/v1/auth/register")
      .send(credentials)

    return await api
      .post(url)
      .send({ username: credentials.username, password: credentials.password })
      .expect(StatusCodes.OK)
      .then(response => {
        expect(response.headers["set-cookie"]).toHaveLength(1)
        expect(response.body.token).toBeDefined();
        expect(response.body.username).toStrictEqual(credentials.username);
        expect(response.body.role).toStrictEqual("user");
        expect(response.body.pfp).toBeNull()
      })
  })

  test("login with inexistent user returns 401 status", async () => {
    return await api
      .post(url)
      .send({ username: "invalid-user", password: "password" })
      .expect(StatusCodes.UNAUTHORIZED)
      .then(response => {
        expect(response.body.message).toStrictEqual("User not found");
      })
  })

  test("login with incorrect password returns 401 status", async () => {
    await api
      .post("/api/v1/auth/register")
      .send(credentials)

    return await api
      .post(url)
      .send({ username: credentials.username, password: "password1" })
      .expect(StatusCodes.UNAUTHORIZED)
      .then(response => {
        expect(response.body.message).toStrictEqual("Incorrect password");
      })
  })
})