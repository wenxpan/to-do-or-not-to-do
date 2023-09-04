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

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Please add username"] },
  email: { type: String, required: [true, "Please add email address"] },
  password: {
    type: String,
    required: [true, "Please add password"],
    minLength: [6, "Password must be longer than 6 characters"],
    maxLength: [128, "Password must be shorter than 128 characters"],
    select: false
  }
})

const UserModel = mongoose.model("User", userSchema)

const progressSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  description: { type: String, required: [true, "Please add description"] }
})

const taskSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please add title"] },
  dateAdded: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  delayReason: { type: String },
  doReason: { type: String },
  additionalInfo: { type: String },
  tags: [String],
  progress: [progressSchema],
  user: { type: mongoose.ObjectId, ref: "users", required: true }
})

const TaskModel = mongoose.model("Task", taskSchema)

export { TaskModel, UserModel, dbClose }
