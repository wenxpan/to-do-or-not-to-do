import { itemModel } from "../db.js"
import { Router } from "express"

const router = Router()

// get all items
router.get("/", async (req, res) => res.send(await itemModel.find()))

// create new item
router.post("/", async (req, res) => {
  try {
    const insertedItem = await itemModel.create(req.body)
    res.status(201).send(insertedItem)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// get one item
router.get("/:id", async (req, res) => {
  try {
    const item = await itemModel.findById(req.params.id)
    if (item) {
      res.send(item)
    } else {
      res.status(404).send({ error: "Item not found" })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// update item
router.put("/:id", async (req, res) => {
  try {
    const item = await itemModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (item) {
      res.send(item)
    } else {
      res.status(404).send({ error: "Item not found" })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// delete item
router.delete("/:id", async (req, res) => {
  try {
    const item = await itemModel.findByIdAndDelete(req.params.id)
    if (item) {
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: "Item not found" })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router
