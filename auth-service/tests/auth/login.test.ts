import { StatusCodes } from "http-status-codes"
import { api, urls } from "../setup"

describe("testing /auth/login endpoint", () => {
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