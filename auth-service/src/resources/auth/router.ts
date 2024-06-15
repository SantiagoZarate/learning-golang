import { Router } from "express";
import controller from './controller';

const router = Router();

// Set a token to the response, which'll be useful for following requests.
router.post("/login", controller.login)

// Create a new user on the db
router.post("/register", controller.register)

export default router;