import { Request } from "express"

export interface ExtRequest extends Request {
  session?: {
    user: JwtUser | null
  },
  cookies: any
}

export type JwtUser = {
  username: string,
  password: string,
  role: string
}