import { StatusCodes } from "http-status-codes"
import { api, urls } from "../setup"

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
    const res = await api
      .get(urls.users)
      .set("Cookie", ['access_token=foo'])
      .expect(StatusCodes.FORBIDDEN)

    expect(res.body.message).toBe("Forbidden resource")
  })
})