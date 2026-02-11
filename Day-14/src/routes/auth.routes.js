const express = require("express")
const authRouter = express.Router();
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require('jsonwebtoken');
const { Console } = require("console");

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const isUserExists = await userModel.findOne({ email })

    if (isUserExists) {
        return res.status(409)
            .json({
                message: "User Aleready Exists"
            })
    }

    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex')
    })
    const token = jwt.sign({
        
        id: user._id,
    }, process.env.JWT_SECRET,
        { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "User register successfully",
        user: {
            name: user.name,
            email: user.email,
        }
    })

    
})
authRouter.get("/get-me", async (req, res) => {
        const token = req.cookies.token

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded)
    })

module.exports = authRouter;