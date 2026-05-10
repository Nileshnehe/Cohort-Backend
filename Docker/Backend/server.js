import { config } from "dotenv";
import app from "./src/app.js";

config()
const PORT = process.env.PORT


app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`)
})
