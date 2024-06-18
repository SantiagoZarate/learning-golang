import { ApiError } from "@/utils/errors";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware(error: ApiError, request: Request, res: Response, next: NextFunction) {
  const message = error.message ? error.message : "Internal server error"
  const statusCode = error.statusCode ? error.statusCode : 500

  res.status(statusCode).json({
    message
  })

  next(error)
}