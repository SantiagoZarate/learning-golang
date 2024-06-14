import { ValidationError, ConnectionError } from "@/utils/errors";
import { Request, Response } from "express";
import { UserRepository } from "./repository";
import { response } from "@/utils/response";
import envs from "@/config/envs";
import jwt from 'jsonwebtoken'
import { ExtRequest } from "@/types/express/extRequest";

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

async function getUsers(req: ExtRequest, res: Response) {
  console.log("asdasd")
  const { user } = req.session!
  if (!user) {
    return res.status(403).send("Acces denied")
  }

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

async function promoteUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const data = await UserRepository.promoteRole(Number(id));
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
  getUsers,
  promoteUser
}