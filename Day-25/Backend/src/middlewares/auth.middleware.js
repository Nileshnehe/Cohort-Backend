const mongoose = require("mongoose");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const blacklistModel = require("./blacklist.middleware");
const Redis = require("../config/cache")
async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isTokenBlackListed = await blacklistModel.findOne({
        token
    })

    if (isTokenBlackListed) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
        )

        req.user = decoded;

        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

}

module.exports = { authUser }