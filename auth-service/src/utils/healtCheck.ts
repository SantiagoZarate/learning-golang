import { Response, Request } from "express";
import envs from "@/config/envs";

export function healthCheck(req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    message: "Api working perftecly fine",
    info: {
      date: new Date(),
      version: envs.VERSION,
      mode: envs.MODE
    }
  })
}