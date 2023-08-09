import express from "express"
import itemRoutes from "./routes/item_routes.js"
import cors from "cors"

const app = express()
const port = 4001

app.use(cors())

// return parsed json in req.body
app.use(express.json())

app.get("/", (req, res) => response.send({ info: "To do or not to do API!" }))

app.use("/items", itemRoutes)

app.listen(port)
