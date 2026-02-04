const mongoose = require("mongoose")


function connectToDb() {
    mongoose.connect("mongodb+srv://nilesh:31rPRGaiqgZqqAWU@cluster0.bq46aog.mongodb.net/Day-07")
    .then(() => {
        console.log("Connected to")
    })
}

module.exports = connectToDb