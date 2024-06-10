import { Application, json, urlencoded } from "express";
import morgan from "morgan";

export function setMiddlewares(server: Application) {
  server.use(json())
  server.use(urlencoded({
    extended: true
  }))
  server.use(morgan("dev"))
}