const express  = require("express");
const userModel = require('../models/user.model')
const authRouter = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

// POST /api/auth/register

authRouter.post("/register", async (req, res) => {
       const { email, username, password, bio, profileImage } = req.body;


       const isUserAlreadyExists = await userModel.findOne({
              $or: [
                     { email },
                     { username }
              ]
       })

       if (isUserAlreadyExists) {
              return res.status(409)
                     .json({
                            message: "user already exists" + (isUserAlreadyExists.email
                                   == email ? "Email already exists" : "user name already exists")

                     })
       }

       const hash = crypto.createHash('sha256').update(password).digest('hex')

       const user = await userModel.create({
              username,
              email,
              bio,
              profileImage,
              password: hash
       })

       // - user ka data hona chahiye
       // - data uniq hona chahiye

       const token = jwt.sign({
              id: user._id,
       }, process.env.JWT_SECRET,
              { expiresIn: '1d' })

              res.cookie("token", token)

              res.status(201).json({
                     message: "User registerd successfully",
                     user: {
                            email: user.email,
                            username: user.username,
                            bio: user.bio,
                            profileImage: user.profileImage
                     }
              })
})

module.exports = authRouter