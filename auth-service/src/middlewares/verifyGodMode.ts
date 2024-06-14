import envs from "@/config/envs";
import { NextFunction, Request, Response } from "express";

export function verifyGodMode(req: Request, res: Response, next: NextFunction) {
  console.log("verificando palabra secreta")

  const secret = req.headers["god_mode_secret"]

  if (!secret || envs.GOD_MODE_SECRET !== secret) {
    console.log(secret)
    return res.status(403).send("Acess denied")
  }

  next()
}