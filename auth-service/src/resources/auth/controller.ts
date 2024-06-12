import { ValidationError, ConnectionError } from "@/utils/errors";
import { Request, Response } from "express";
import { UserRepository } from "./repository";
import { response } from "@/utils/response";

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password })
    const data = user.id
    response({ res, data, message: "Log on succesfull" })
  } catch (error: any) {
    if (error instanceof ValidationError) {
      response({ res, message: error.message, statusCode: 403 })
    }
    response({ res, message: error.message, statusCode: 500 })
  }
}

async function getUsers(_req: Request, res: Response) {
  try {
    const results = await UserRepository.findAll();
    response({ res, data: results, message: "retrieving users" })
  } catch (error) {
    if (error instanceof ConnectionError) {
      response({ res, message: error.message, statusCode: 500 })
    }
  }
}

async function register(req: Request, res: Response) {
  const { username, password, email } = req.body;
  try {
    const data = await UserRepository.register({ username, password, email })
    response({ res, data, message: "Registered succesfully" })
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return response({ res, message: error.message, statusCode: 403 })
    }
    return response({ res, message: error.message, statusCode: 500 })
  }
}

export default {
  login,
  register,
  getUsers
}