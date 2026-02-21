const express = require("express");
 const authController = require("../controller/auth.controller")
const authRouter = express.Router()
const identifyUser = require("../middlewares/auth.middleware")


// POST /api/auth/register

authRouter.post("/register", authController.registerController)

authRouter.post("/login", authController.loginController) 

// @route GET /api/auth/get-me
// @desc get the currently logged in user's info
// @access private
authRouter.get("/get-Me", identifyUser, authController.getMeController)

module.exports = authRouter