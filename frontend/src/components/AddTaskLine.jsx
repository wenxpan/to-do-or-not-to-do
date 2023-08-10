import React, { useState, useContext } from "react"
import TaskContext from "../contexts/TaskContext"
import { postTask } from "../services/tasksService"

const AddTaskLine = () => {
  const [newTask, setNewTask] = useState({ title: "" })
  const { tasksDispatch } = useContext(TaskContext)

  async function handleAddTask(task) {
    const insertedTask = await postTask(task)
    tasksDispatch({
      type: "add_task",
      task: insertedTask
    })
    setNewTask({ title: "" })
  }

  return (
    <div>
      <input
        value={newTask.title}
        onChange={(e) =>
          setNewTask((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="add task"
      ></input>
      <button onClick={() => handleAddTask(newTask)}>Add task</button>
    </div>
  )
}

export default AddTaskLine
