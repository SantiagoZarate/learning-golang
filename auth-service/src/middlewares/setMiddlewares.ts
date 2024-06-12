import envs from "@/config/envs";
import { Application, json, urlencoded } from "express";
import morgan from "morgan";
import path from "path";

export function setMiddlewares(server: Application) {
  server.use(json())
  server.use(urlencoded({
    extended: true
  }))
  envs.MODE === "dev" && server.use(morgan("dev"))
}