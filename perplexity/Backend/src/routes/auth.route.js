import { Router } from "express";
import { getMe, login, register, verifyEmail } from "../controller/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, register);

authRouter.post("/login",loginValidator, login)

authRouter.get("/getMe", authUser, getMe)

authRouter.get("/verify-email", verifyEmail);



export default authRouter;