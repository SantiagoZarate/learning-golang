import { start } from '@/server/server'
import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import db from '@/db/db'
import user from '@/resources/user/schema'
import envs from '@/config/envs'

const server = start()
export const api = supertest(server)

const urls = {
  promote: "/api/v1/admin/promote",
  login: "/api/v1/auth/login",
  register: "/api/v1/auth/register",
  healtcheck: "/api/v1/test",
  users: "/api/v1/admin/users"
}

afterAll(() => {
  server.close()
})

afterEach(async () => {
  await (await db)!.delete(user)
})

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

describe("Testing /admin/users endpoint", () => {
  test("should returns error if there is no token", async () => {
    const res = await api
      .get(urls.users)
      .expect(StatusCodes.UNAUTHORIZED)

    expect(res.body.message).toBe<string>("Access denied")
  })

  test("should returns error if token is invalid", async () => {
    const res = await api
      .get(urls.users)
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
      .get(urls.users)
      .set("Cookie", ['access_token=foo'])
      .expect(StatusCodes.FORBIDDEN)

    expect(res.body.message).toBe("Forbidden resource")
  })
})

describe("testing /api/v1/admin/promote endpoint", () => {
  test("create a user and promote his role", async () => {
    const newUser = { username: "user", password: "password", email: "user@gmail.com" }

    await api
      .post(urls.register)
      .send(newUser)

    const res = await api.get(urls.users + "/" + newUser.username).set("god_mode_secret", envs.GOD_MODE_SECRET)

    const id = res.body.results.id

    await api
      .post(urls.promote + "/" + id)
      .set("god_mode_secret", envs.GOD_MODE_SECRET)
      .expect(StatusCodes.CREATED)
      .then((response) => {
        expect(response.body.message).toStrictEqual("User succesfully promoted")
      })

    return await api
      .get(urls.users + "/" + newUser.username)
      .set("god_mode_secret", envs.GOD_MODE_SECRET)
      .expect(StatusCodes.OK)
      .then((response) => {
        expect(response.body.results.role).toStrictEqual("admin")
      })
  })
})

describe("testing /api/v1/auth/register endpoint", () => {
  const body = { username: "santi24", password: "contraseña8", email: "santi24@gmail.com" }

  test("should return a response with the credentials passed", async () => {
    return await api
      .post(urls.register)
      .send(body)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(StatusCodes.OK)
      .then(response => {
        expect(response.body.results.id).toBeDefined()
        expect(response.body.message).toStrictEqual("Registered succesfully")
      })
  })

  test("should return error for duplicated credentials", async () => {
    await api
      .post(urls.register)
      .send(body)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(StatusCodes.OK)

    return await api
      .post(urls.register)
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
        .post(urls.register)
        .send(user)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .expect(StatusCodes.OK)
        .then(response => {
          expect(response.body.results.id).toBeDefined();
          expect(response.body.message).toStrictEqual("Registered succesfully");
        })
    );

    await Promise.all(promises);
  })
})

describe("testing /api/v1/auth/login endpoint", () => {
  const credentials = { username: "user1", password: "password", email: "user1@gmail.com" }

  test("login with correct credentials should return access token through header", async () => {
    await api
      .post(urls.register)
      .send(credentials)

    return await api
      .post(urls.login)
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
      .post(urls.login)
      .send({ username: "invalid-user", password: "password" })
      .expect(StatusCodes.UNAUTHORIZED)
      .then(response => {
        expect(response.body.message).toStrictEqual("User not found");
      })
  })

  test("login with incorrect password returns 401 status", async () => {
    await api
      .post(urls.register)
      .send(credentials)

    return await api
      .post(urls.login)
      .send({ username: credentials.username, password: "password1" })
      .expect(StatusCodes.UNAUTHORIZED)
      .then(response => {
        expect(response.body.message).toStrictEqual("Incorrect password");
      })
  })
})