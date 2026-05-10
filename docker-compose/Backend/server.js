import express from "express"
import morgan from "morgan"

const app = express();

app.use(morgan("dev"))

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get("/api/hello", (req, res) => {
    res.status(200).json({ message: "Hello World" })
})

app.get("/api/users", (req, res) => {
    const users = [
        { id: 1, name: 'hey' },
        { id: 2, name: 'hello' }
    ];

    res.status(200).json(users)

})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})