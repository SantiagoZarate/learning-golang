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

export const app = express();

setMiddlewares(app);

app.get("/api/v1", homeView);
app.get("/api/v1/test", healthCheck);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter)

app.use(errorMiddleware)

export function start() {
  const server = app.listen(envs.PORT, () => {
    console.log(`Server listening on http://localhost:${envs.PORT}`)
  })
  console.log(db._.tableNamesMap)
  return server
}