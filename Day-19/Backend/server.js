require('dotenv').config()
const app = require("./src/app.js")
const connectToDatabase = require("./src/config/database")
const database = require("./src/config/database")


connectToDatabase()

app.listen(3000, ()=> {
    console.log("express is running on port 3000")
})