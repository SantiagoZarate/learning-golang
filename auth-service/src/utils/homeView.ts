import { Request, Response } from "express";
import path from "path";

export function homeView(req: Request, res: Response) {
  res.sendFile(path.resolve(__dirname, "../../public/index.html"))
}