import envs from "@/config/envs";
import { Application, json, urlencoded } from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser'

export function setMiddlewares(server: Application) {
  server.use(json())
  server.use(urlencoded({
    extended: true
  }))
  server.use(cookieParser())
  envs.MODE === "dev" && server.use(morgan("dev"))
}