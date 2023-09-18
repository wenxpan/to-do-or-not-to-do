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
    <div className="my-2 flex items-center space-x-4">
      <input
        value={newTask.title}
        onChange={(e) =>
          setNewTask((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="add task"
        className="grow"
      ></input>
      <button
        onClick={() => handleAddTask(newTask)}
        className="bg-cyan-300/50 p-2 hover:bg-cyan-300/75"
      >
        Add task
      </button>
    </div>
  )
}

export default AddTaskLine
