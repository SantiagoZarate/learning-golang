import { ExtRequest } from "@/types/express/extRequest";
import { NextFunction, Response } from "express";

export function verifyAdmin(req: ExtRequest, res: Response, next: NextFunction) {
  const { role } = req.session?.user!;

  if (role !== 'admin') {
    return res.status(403).send("insuficient role")
  }

  next();
}