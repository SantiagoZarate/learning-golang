import db from "@/db/db"
import user from "@/resources/user/schema"
import { start } from "@/server/server"
import supertest from "supertest"

const server = start()
export const api = supertest(server)

export const urls = {
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