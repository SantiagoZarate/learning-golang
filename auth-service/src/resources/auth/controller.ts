import { Request, Response } from "express";
import db from "../../utils/db";
import user from "./schema";
import { response } from "../../utils/response";
import { eq } from "drizzle-orm";
import { UserRepository } from "./repository";

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password })
    const data: typeof user = {
      ...user,
      password: "",
      id: 0
    }
    response({ res, data, message: "Log on succesfull" })
  } catch (error) {
    response({ res, data: "LOL", message: error as string })
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const results = await UserRepository.findAll();
    response({ res, data: results, message: "retrieving users" })
  } catch (error) {
    console.log(error)
  }
}

async function register(req: Request, res: Response) {
  const { username, password, email } = req.body;
  try {
    const data = await UserRepository.register({ username, password, email })
    response({ res, data, message: "Registered succesfully" })
  } catch (error) {
    response({ res, message: "Registered succesfully" })
  }
}

export default {
  login,
  register,
  getUsers
}