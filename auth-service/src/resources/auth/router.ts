import { Router } from "express";
import controller from './controller'

const router = Router();

router.post("/login", controller.login)
router.get("/users", controller.getUsers)
router.post("/register", controller.register)

export default router;