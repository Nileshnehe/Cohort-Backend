const express = require("express");
const cookieParser = require('cookie-parser');


const app = express()
app.use(express.json())
app.use(cookieParser())

// require Routes
const authRouter = require("./routes/auth.route")
const postRouter = require('./routes/post.rout')
const userRouter = require("./routes/user.route")

// using routes
app.use("/api/auth",authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)

module.exports = app