import express from 'express'
import { setMiddlewares } from '@/middlewares/setMiddlewares';
import { healthCheck } from '@/utils/healtCheck';
import envs from '@/config/envs';
import authRouter from '@/resources/auth/router'

const server = express();

setMiddlewares(server);

server.get("/api/v1/test", healthCheck);
server.use("/api/v1/auth", authRouter);

export function start() {
  server.listen(envs.PORT, () => {
    console.log(`Server listening on http://localhost:${envs.PORT}`)
  })
}