import { StatusCodes } from "http-status-codes"
import { api, urls } from "../setup"

describe("testing /auth/register endpoint", () => {
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