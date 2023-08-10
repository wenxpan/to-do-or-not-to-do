import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import TaskContext from "../contexts/TaskContext"
import { postTask } from "../services/tasksService"

const NewTask = () => {
  const [title, setTitle] = useState()
  const nav = useNavigate()
  const { tasksDispatch } = useContext(TaskContext)

  async function handleAddTask() {
    const insertedTask = await postTask({ title: title })
    tasksDispatch({
      type: "add_task",
      task: insertedTask
    })
    nav(`/tasks/${insertedTask._id}`, { state: { editing: true } })
  }

  return (
    <div>
      <h2>Enter title:</h2>
      <textarea
        placeholder="I want to..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>
      <button onClick={handleAddTask}>Add</button>
    </div>
  )
}

export default NewTask
