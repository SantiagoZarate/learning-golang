import { Router } from "express";
import controller from './controller';
import { validateData } from "@/middlewares/SchemaValidation";
import { userLoginSchema, userRegisterSchema } from "@/middlewares/zodSchemas/user";

const router = Router();

// Set a token to the response, which'll be useful for following requests.
router.post("/login", validateData(userLoginSchema), controller.login)

// Create a new user on the db
router.post("/register", validateData(userRegisterSchema), controller.register)

export default router;