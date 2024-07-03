import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { verifyGodMode } from "@/middlewares/verifyGodMode";
import { verifyToken } from "@/middlewares/verifyToken";
import controller from "./controller";
import { Router } from "express";

const router = Router();

// Must be admin to get all the users
router.get("/users", verifyToken, verifyAdmin, controller.getUsers)

// Must be admin to get all the users
router.get("/users/:username", verifyGodMode, controller.getUser)

// Assig admin role to a certain user
router.post("/promote/:id", verifyGodMode, controller.promoteUser);

export default router