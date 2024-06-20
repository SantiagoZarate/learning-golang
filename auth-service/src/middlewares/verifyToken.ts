import envs from "@/config/envs"
import { ExtRequest, JwtUser } from "@/types/express/extRequest"
import { ValidationError } from "@/utils/errors"
import { NextFunction, Response } from "express"
import jwt from 'jsonwebtoken'

export function verifyToken(req: ExtRequest, res: Response, next: NextFunction) {
  const token = req.cookies["access_token"]

  if (!token) {
    throw new ValidationError("Access denied")
  }

  req.session = { user: null }

  try {
    const data = jwt.verify(token, envs.JWT_SECRET)
    req.session.user = data as JwtUser
    console.log(data)
  } catch {
    throw new ValidationError("Invalid token")
  }

  next()
}