import envs from "@/config/envs";
import { Response } from "express";

interface ResponseType {
  res: Response,
  message: string,
  data?: any[] | any
  statusCode?: number,
}

export function response({ data, message, res, statusCode = 200 }: ResponseType) {
  return res.status(statusCode).json({
    results: data,
    message,
    info: {
      version: envs.VERSION,
    }
  })
}