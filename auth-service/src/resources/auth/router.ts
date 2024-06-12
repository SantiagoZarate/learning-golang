import { Router } from "express";
import controller from './controller'
import { verifyToken } from "@/middlewares/verifyToken";

const router = Router();

router.post("/login", controller.login)
router.get("/users", verifyToken, controller.getUsers)
router.post("/register", controller.register)

export default router;


