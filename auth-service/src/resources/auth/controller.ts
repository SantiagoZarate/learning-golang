import { Request, Response } from "express";
import db from "../../utils/db";
import user from "./schema";
import { response } from "../../utils/response";

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const result = await db.insert(user).values({
      password,
      name: username,
      email: "mymail@gmail.com",
      role: 'default'
    }).returning()
    return res.status(200).json({
      message: "OK",
      result
    })
  } catch (error) {
    console.log(error)
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const results = await db.query.user.findMany();
    res.json({ results })
  } catch (error) {
    console.log(error)
  }
}

async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const result = await db.insert(user).values({
      password,
      name: username,
      email: "mymail@gmail.com",
      role: 'default'
    }).returning()
    response({ res, data: result, message: "Registered succesfully" })
  } catch (error) {
    console.log(error)
  }
}

export default {
  login,
  register,
  getUsers
}