const express = require("express")

const app = express();  /* server create hota hai */

const notes = []

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello World")   
})

/* post/notes*/
app.post("/notes", (req,res) => {
    console.log(req.body)
    notes.push(req.body)
    console.log(notes)

    res.send("note created")
})

/* get/notes */
app.get("/notes", (req,res) => {
    res.send(notes)
})

/*
DELETE/notes/idx
*/ 
app.delete("/notes/:index", (req,res) => {
    delete notes [ req.params.index ] 

    res.send("note deleted sucssesfully")
})

/*
PATCH/notes
*/
app.patch("/notes/:index", (req, res) => {
    notes[ req.params.index ].description = req.body.description

    res.send("Note Updated Sucessfully")
})

module.exports = app