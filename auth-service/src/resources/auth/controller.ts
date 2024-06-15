import envs from "@/config/envs";
import { ValidationError } from "@/utils/errors";
import { response } from "@/utils/response";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserRepository } from "../user/repository";

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ username, password: user.password, role: user.role }, envs.JWT_SECRET)
    const data = user.id
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: true
    })
    response({ res, data, message: "Log on succesfull" })
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return response({ res, message: error.message, statusCode: 403 })
    }
    response({ res, message: error.message, statusCode: 500 })
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
}