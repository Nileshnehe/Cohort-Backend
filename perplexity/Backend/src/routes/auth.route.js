import { Router } from "express";
import { login, register, verifyEmail } from "../controller/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, register);

authRouter.get("/verify-email", loginValidator, verifyEmail);

authRouter.post("/login", login)

export default authRouter;