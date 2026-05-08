import express from "express"

const app = express()
app.get("/", (req, res) => {
    res.status(200).json({message: "Hello World!"})
})

app.get("/api/get", (req, res) => {
    const data = {
        id: 1,
        name: "NeelCEO",

    }
    res.status(200).json(data)
})

export default app