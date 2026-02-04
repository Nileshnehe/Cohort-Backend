/*
    -- server ko start karna 
    -- database se connect
*/ 

const app = require("./src/app")
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://nileshnehe212_db_user:BpsFWVqkbNqtIeO6@cohort2.x1bdfl5.mongodb.net/Day-06")
}


app.listen(3000, () =>{
    console.log("Express is running on port 3000");
    
})

