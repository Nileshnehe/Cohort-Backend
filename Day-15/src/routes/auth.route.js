const { response } = require("express");
const mongoose = require("mongoose")
const authRouter = express.Router()

authRouter.post("/register", async(req,res)=>{
       const { email, username, password, bio, profileImage} =req.body;

       
       const isUserAlreadyExists = await userModel.findOne({
              $or:[
                     {email},
                     {username}
              ]
       })

       if (isUserAlreadyExists) {
              return res.status(409)
              .json({
                     message: "user already exists"
              })
       }
})