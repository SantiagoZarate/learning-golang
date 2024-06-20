import { StatusCodes } from 'http-status-codes'

export class ApiError extends Error {
  readonly statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST)
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED)
  }
}

export class InsuficcientRoleError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN)
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND)
  }
}

export class ConnectionError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_GATEWAY)
    this.name = "Connection Error"
  }
}