import { Request, Response } from "express";
import db from "../../utils/db";
import user from "./schema";
import { response } from "../../utils/response";
import { eq } from "drizzle-orm";

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const foundUser = await db.select().from(user).where(eq(user.name, username));

    if (foundUser.length === 0) {
      return res.status(401).send("invalid credentials")
    }

    if (foundUser[0].password !== password) {
      return res.status(401).send("invalid credentials")
    }
    response({ res, data: "LOL", message: "log in!" })
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
  const { username, password, email } = req.body;
  try {
    const foundUser = await db.select().from(user).where(eq(user.name, username));

    if (foundUser.length === 0) {
      return res.status(401).send("username already in used")
    }

    const result = await db.insert(user).values({
      password,
      email,
      name: username,
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