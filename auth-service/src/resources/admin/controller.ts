import { ExtRequest } from "@/types/express/extRequest";
import { Request, Response } from 'express'
import { ConnectionError, ValidationError } from "@/utils/errors";
import { response } from "@/utils/response";
import { UserRepository } from "../user/repository";

async function getUsers(req: ExtRequest, res: Response) {
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
  getUsers,
  promoteUser
}