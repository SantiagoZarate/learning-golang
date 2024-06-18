import { ExtRequest } from "@/types/express/extRequest";
import { response } from "@/utils/response";
import { Request, Response } from 'express';
import { UserRepository } from "../user/repository";

async function getUsers(req: ExtRequest, res: Response) {
  const results = await UserRepository.findAll();
  response({ res, data: results, message: "retrieving users" })
}

async function promoteUser(req: Request, res: Response) {
  const { id } = req.params
  const data = await UserRepository.promoteRole(Number(id));
  response({ res, data, message: "User succesfully promoted" })
}

export default {
  getUsers,
  promoteUser
}