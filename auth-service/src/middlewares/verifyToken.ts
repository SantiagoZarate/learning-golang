import envs from "@/config/envs"
import { ExtRequest, JwtUser } from "@/types/express/extRequest"
import { NextFunction, Response } from "express"
import jwt from 'jsonwebtoken'

export function verifyToken(req: ExtRequest, res: Response, next: NextFunction) {
  const token = req.cookies["access_token"]

  if (!token) {
    return res.status(403).send("Acess denied")
  }

  req.session = { user: null }

  try {
    const data = jwt.verify(token, envs.JWT_SECRET)
    req.session.user = data as JwtUser
  } catch { }

  next()
}