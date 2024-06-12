import { Request } from "express"

export interface ExtRequest extends Request {
  session?: {
    user?: any
  },
  cookies: any
}

export type JwtUser = {
  username: string,
  password: string
}