import jwt from "jsonwebtoken"
import { TaskModel, UserModel } from "../db.js"

const tokenRequired = async (req, res, next) => {
  // const authHeader = req.headers["authorization"]
  // const token = authHeader?.split(" ")[1]
  const token = req.cookies.token

  if (!token) {
    return res.status(401).send({ error: "Authorization token missing" })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findById(decodedToken.id)

    if (!user) {
      return res.status(403).send({ error: "Invalid user" })
    }
    req.user = user
    next()
  } catch (e) {
    return res.status(403).json({ error: "Invalid token" })
  }
}

const adminRequired = async (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    return res.status(403).send({ error: "Unauthorized" })
  }
}

const adminOrOwnerRequired = async (req, res, next) => {
  const task = await TaskModel.findById(req.params.id)
  if (
    req.user.isAdmin ||
    req.user.equals(req.params.id) ||
    req.user.equals(task?.user)
  ) {
    next()
  } else {
    return res.status(403).json({ error: "Unauthorized" })
  }
}

export { adminRequired, tokenRequired, adminOrOwnerRequired }
