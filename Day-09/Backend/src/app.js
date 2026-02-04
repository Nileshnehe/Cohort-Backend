const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());

// POST /api/notes
// create new note and save data mongodb
// req.body = {title,description}
app.post('/api/notes',  async (req, res) => {
    const {title, description} = req.body

    const note = await noteModel.create({
        title,description
});

res.status(201).json({
    message: "note created successfully",
    note
});
});

// GET 
// Fetch all the notes from mongodb ans send them the response 

app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes Fetched successfully",
        notes
    })
})

// DELETE /api/notes    
// Delte note with the id form req.params

app.delete('/api/notes/:id', async (req,res) => {
    const id = req.params.id
    console.log(id)

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note Delete Sucessfully"
    })
})

// PATCH  api/notes/:id
// update the description of the note by id
// req.body = {description}

app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate( id, {description})

    res.status(200).json({
        message: "Note updated sucessfully"
    })
})


module.exports = app