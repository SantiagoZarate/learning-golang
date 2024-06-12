import { Router } from "express";
import controller from './controller'
import { verifyToken } from "@/middlewares/verifyToken";

const router = Router();

// Set a token to the response, which'll be useful for following requests.
router.post("/login", controller.login)

// Must have logged in to check all the users
router.get("/users", verifyToken, controller.getUsers)

// Create a new user on the db
router.post("/register", controller.register)

export default router;


