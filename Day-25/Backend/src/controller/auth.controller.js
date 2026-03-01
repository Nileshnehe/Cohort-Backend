const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../middlewares/blacklist.middleware")


/**
 * Registers a new user in the database.
 * Creates a user document with hashed password using Mongoose model.
 */
async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    if (isAlreadyRegistered) {
        return res.status(400)
            .json({
                message: "User with the same email and username already exists"
            })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        })
}

/**
 * Authenticates a user.
 * Verifies email and password, and returns authentication response.
 */
async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(400)
            .json({
                message: "Invalid Credentials"
            })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }
    const token = jwt.sign(
        {
            id: user._id, 
            username: user.username
        }, process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )

    res.cookie("token", token)

    return res.status(200).json({
        message: "User Logged in successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * getMe
 * /api/auth/get-Me
 */
async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User fetched successfully",
        user
    })
                 
}

/**
 * /api/auth/logout
 */
async function logoutUser(req, res) {
    const token = req.cookies.token

    res.clearCookies("token")

    await blacklistModel.create({
        token
    })

    res.status(201).json({
        message: "Logout SuccessFully"
    })
}




module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}