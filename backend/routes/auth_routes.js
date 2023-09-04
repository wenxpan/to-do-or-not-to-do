import { UserModel } from "../db.js"
import { Router } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const router = Router()

// login
router.post("/login", async (req, res) => {
  const { email, username, password } = req.body

  if (!(email || username) || !password) {
    return res
      .status(400)
      .json({ error: "Email/username and password are required." })
  }

  try {
    const user =
      (await UserModel.findOne({ email })) ||
      (await UserModel.findOne({ username }))
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (isPasswordMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE
        })
        res.status(200).send({ token, user })
      } else {
        res.status(400).send({ error: "Invalid credentials" })
      }
    } else {
      res.status(400).send({ error: "User not found" })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// register
router.post("/signup", async (req, res) => {
  try {
    const { username, email } = req.body
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const newUser = await UserModel.create({
      username,
      email,
      password,
      isAdmin: false
    })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    })
    res.status(201).send({ token, user: newUser })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router
