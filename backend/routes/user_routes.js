import { TaskModel, UserModel } from "../db.js"
import { Router } from "express"
import bcrypt from "bcryptjs"
import {
  tokenRequired,
  adminRequired,
  adminOrOwnerRequired
} from "../utils/checkAuth.js"

const router = Router()

// admin get all users
router.get("/", tokenRequired, adminRequired, async (req, res) =>
  res.send(await UserModel.find())
)

// get one user
router.get("/:id", tokenRequired, adminOrOwnerRequired, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ error: "User not found" })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// update user
router.put("/:id", tokenRequired, adminOrOwnerRequired, async (req, res) => {
  try {
    const { email, username } = req.body
    const salt = await bcrypt.genSalt(10)
    const password =
      req.body.password && (await bcrypt.hash(req.body.password, salt))
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { email, username, password },
      {
        new: true
      }
    )
    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ error: "User not found" })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// delete user
router.delete("/:id", tokenRequired, adminRequired, async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    if (user) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: "User not found" })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.get(
  "/:id/tasks",
  tokenRequired,
  adminOrOwnerRequired,
  async (req, res) => {
    const userTasks = await TaskModel.find({ user: req.params.id })
    res.send(userTasks)
  }
)

export default router
