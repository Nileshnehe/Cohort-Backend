const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


async function registerController (req, res) {
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
}


 async function loginController (req, res)  {
       const { username, email, password } = req.body;

       const user = await userModel.findOne({
              $or: [
                     // condition
                     { username: username },

                     // condition
                     { email: email }
              ]
       })

       if (!user) {
              return res.status(404)
                     .json({
                            message: "user not found"
                     })
       }

       const hash = crypto.createHash('sha256').update(password).digest('hex')

       const isPasswordValid = hash == user.password

       if (!isPasswordValid) {
              return res.status(401)
                     .json({
                            message: "Password invalid"
                     })
       }
       const token = jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET,
              { expiresIn: "1day" }
       )
       res.cookie("token", token)

       res.status(200)
              .json({
                     message: "User loggedIn Successfully",
                     user: {
                            username: user.username,
                            email: user.email,
                            bio: user.bio,
                            profileImage: user.profileImage
                     }
              })
}

module.exports ={
    registerController,
    loginController
}