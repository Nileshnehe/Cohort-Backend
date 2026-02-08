const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRoute = express.Router()

authRoute.post("/register", async (req, res) => {
    const { email, name, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists with this email"
        })

    }

    const user = await userModel.create({
        email,
        name,
        password
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




module.exports = authRoute