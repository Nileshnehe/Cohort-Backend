const express = require("express");

const app = express()

app.get("/", (req,res) => {
    res.send("Express is working")
})

app.get("/home", (req,res) => {
    res.send("This is home page")
})

app.listen("3000", () => {
    console.log("Server is running on http://localhost:3000");
    
})