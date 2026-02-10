const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")

authRouter.post("/register", async (req, res) => {
    const { email, name, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists with this email"
        })

    }

    const hash = crypto.createHash("md5").update(password).digest("hex") 

    const user = await userModel.create({
        email,
        name,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )
    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User Registred",
        user,
        token
    })

})

// /api/auth/protected
authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);


    res.status(200).json({
        message: "this is a protected route"
    })
})

// /api/auth/login

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        res.status(404).json({
            message: "user not found on this email"
        })
    }

    const ispasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!ispasswordMatched) {
        res.status(401).json({
            massage: "Invalid password"
        })
    }
    
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "User Logged in",
        user,
    })
   
})




module.exports = authRouter