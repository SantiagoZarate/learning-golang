import envs from "@/config/envs"
import { StatusCodes } from "http-status-codes"
import { api, urls } from "../setup"

describe("testing /admin/promote endpoint", () => {
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