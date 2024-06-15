import envs from "@/config/envs";
import express, { Application, json, urlencoded } from "express";
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import path from "path";
import cors from 'cors'

export function setMiddlewares(server: Application) {
  server.use(express.static(path.resolve("public")))
  server.use(json())
  server.use(urlencoded({
    extended: true
  }))
  server.use(cors())
  server.use(cookieParser())
  envs.MODE === "dev" && server.use(morgan("dev"))
}