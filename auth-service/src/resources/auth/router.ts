import { Router } from "express";
import controller from './controller'
import { verifyToken } from "@/middlewares/verifyToken";
import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { verifyGodMode } from "@/middlewares/verifyGodMode";

const router = Router();

// Set a token to the response, which'll be useful for following requests.
router.post("/login", controller.login)

// Create a new user on the db
router.post("/register", controller.register)

// Must be admin to get all the users
router.get("/users", verifyToken, verifyAdmin, controller.getUsers)

// Assig admin role to a certain user
router.post("/promote/:id", verifyGodMode, controller.promoteUser);


export default router;


