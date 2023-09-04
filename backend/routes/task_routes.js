import { TaskModel } from "../db.js"
import { Router } from "express"

const router = Router()

// get all tasks
router.get("/", async (req, res) => res.send(await TaskModel.find()))

// create new task
router.post("/", async (req, res) => {
  try {
    const insertedTask = await TaskModel.create(req.body)
    res.status(201).send(insertedTask)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// get one task
router.get("/:id", async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id)
    if (task) {
      res.send(task)
    } else {
      res.status(404).send({ error: "Task not found" })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// update task
router.put("/:id", async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (task) {
      res.send(task)
    } else {
      res.status(404).send({ error: "Task not found" })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// delete task
router.delete("/:id", async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id)
    if (task) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: "Task not found" })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router
