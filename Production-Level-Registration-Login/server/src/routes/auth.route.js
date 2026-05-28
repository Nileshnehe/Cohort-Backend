import express, { Router } from "express";
import { registerController } from "../controller/auth.controller.js";
import { registerSchema } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.js";


const router = Router()


router.post("/register", validate(registerSchema), registerController);

export default router;