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
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax", // 'strict', 'lax'
          maxAge: 7200000 // 2 hour
        })
        const returnedUser = await UserModel.findById(user._id).select(
          "-password"
        )
        res.status(200).send({ success: true, user: returnedUser })
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // or 'strict'
      maxAge: 7200000 // 2 hour
    })
    res.status(201).send({ success: true, user: newUser })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.get("/check-auth", async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.send({ success: false, message: "Not authenticated" })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findById(decodedToken.id)
    if (user) {
      return res.send({ success: true, user })
    } else {
      return res.status(403).send({ error: "Invalid user" })
    }
  } catch (err) {
    return res.status(403).json({ error: err.message })
  }
})

export default router
