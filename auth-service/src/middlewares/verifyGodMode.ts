import envs from "@/config/envs";
import { ValidationError } from "@/utils/errors";
import { NextFunction, Request, Response } from "express";

export function verifyGodMode(req: Request, res: Response, next: NextFunction) {
  const secret = req.headers["god_mode_secret"]

  if (!secret || envs.GOD_MODE_SECRET !== secret) {
    throw new ValidationError("You don't own the powers")
  }

  next()
}