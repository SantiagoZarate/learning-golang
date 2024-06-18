import 'express-async-errors'
import express from 'express'
import { setMiddlewares } from '@/middlewares/setMiddlewares';
import { healthCheck } from '@/utils/healtCheck';
import envs from '@/config/envs';
import authRouter from '@/resources/auth/router'
import adminRouter from '@/resources/admin/router'
import { homeView } from '@/utils/homeView';
import { errorMiddleware } from '@/middlewares/errorMiddleware';
import db from '@/db/db';

const server = express();

setMiddlewares(server);

server.get("/api/v1", homeView);
server.get("/api/v1/test", healthCheck);
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/admin", adminRouter)

server.use(errorMiddleware)

export function start() {
  server.listen(envs.PORT, () => {
    console.log(`Server listening on http://localhost:${envs.PORT}`)
  })
  console.log(db._.tableNamesMap)
}