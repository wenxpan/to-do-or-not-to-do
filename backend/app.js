import taskRoutes from "./routes/task_routes.js"
import userRoutes from "./routes/user_routes.js"
import authRoutes from "./routes/auth_routes.js"
import cors from "cors"
import express from "express"

const app = express()

app.use(cors())

// return parsed json in req.body
app.use(express.json())

app.get("/", (req, res) => response.send({ info: "To do or not to do API!" }))

app.use("/", authRoutes)
app.use("/tasks", taskRoutes)
app.use("/users", userRoutes)

export default app
