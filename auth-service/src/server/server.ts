import express, { Request, Response } from 'express'
import { setMiddlewares } from '../middlewares/setMiddlewares'

const server = express()

setMiddlewares(server)

server.use("/ping", (req: Request, res: Response) => {
  res.send("pong!")
})

export function start() {
  server.listen(4000, () => {
    console.log(`Server listening on http://localhost:8080`)
  })
}