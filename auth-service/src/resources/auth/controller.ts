import envs from "@/config/envs";
import { response } from "@/utils/response";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserRepository } from "../user/repository";

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await UserRepository.login({ username, password })
  const token = jwt.sign({ username, password: user.password, role: user.role }, envs.JWT_SECRET)
  res.cookie("access_token", token, {
    httpOnly: true,
    sameSite: true
  })
  res.json({
    token
  })
}

async function register(req: Request, res: Response) {
  const { username, password, email } = req.body;
  const data = await UserRepository.register({ username, password, email })
  response({ res, data, message: "Registered succesfully" })
}

export default {
  login,
  register,
}