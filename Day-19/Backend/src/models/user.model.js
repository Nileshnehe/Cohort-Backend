const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "User name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: {
        type: String
    },
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/l0fbze2wt/download%20(1).jpg"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
