import express, { Request, Response } from 'express'
import { setMiddlewares } from '../middlewares/setMiddlewares'
import envs from '../config/envs'

const server = express()

setMiddlewares(server)

server.use("/ping", (req: Request, res: Response) => {
  res.send("pong!")
})

export function start() {
  server.listen(envs.PORT, () => {
    console.log(`Server listening on http://localhost:8080`)
  })
}