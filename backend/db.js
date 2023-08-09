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

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  status: { type: String, required: true },
  delayReason: { type: String },
  doReason: { type: String },
  additionalInfo: { type: String },
  tags: { type: Array },
  progress: [progressSchema]
})

const itemModel = mongoose.model("Item", itemSchema)

export { itemModel, dbClose }
