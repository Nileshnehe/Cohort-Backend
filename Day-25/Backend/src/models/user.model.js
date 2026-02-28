const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[ "Username is required"],
        unique: [true, "Username must be uniq"]
    }, 
    email:{
        type:String,
        required: [true, "Email is required"],
        required: [true, "Email must be unique"]
    },
    password:{
        type:String,
        required: [true, "Password is requied"],
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel