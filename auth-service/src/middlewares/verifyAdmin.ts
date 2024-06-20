import { ExtRequest } from "@/types/express/extRequest";
import { InsuficcientRoleError } from "@/utils/errors";
import { NextFunction, Response } from "express";

export function verifyAdmin(req: ExtRequest, res: Response, next: NextFunction) {
  const { role } = req.session?.user!;

  if (role !== 'admin') {
    return new InsuficcientRoleError("Forbidden resource")
  }

  next();
}