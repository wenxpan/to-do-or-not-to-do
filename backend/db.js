import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

async function dbClose() {
  await mongoose.connection.close()
  console.log("Database disconnected")
}

mongoose
  .connect(process.env.ATLAS_DB_URL)
  .then((m) =>
    console.log(
      m.connection.readyState === 1
        ? "Mongoose connected!"
        : "Mongoose failed to connect"
    )
  )
  .catch((err) => console.error(err))

const progressSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  description: { type: String, required: true }
})

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  delayReason: { type: String },
  doReason: { type: String },
  additionalInfo: { type: String },
  tags: [String],
  progress: [progressSchema]
})

const taskModel = mongoose.model("Task", taskSchema)

export { taskModel, dbClose }
