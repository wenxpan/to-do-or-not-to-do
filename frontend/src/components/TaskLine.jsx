import React, { useContext, useState } from "react"
import TaskContext from "../contexts/TaskContext"
import { deleteTask, putTask } from "../services/tasksService"

const TaskLine = ({ task }) => {
  const { tasksDispatch } = useContext(TaskContext)
  const [editing, setEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  async function handleDeleteTask(task) {
    await deleteTask(task._id)
    tasksDispatch({
      type: "delete_task",
      task
    })
  }

  async function handleCompleteTask(task) {
    const newTask = { ...task, isCompleted: !task.isCompleted }
    await putTask(newTask)
    tasksDispatch({
      type: "update_task",
      task: newTask
    })
  }

  async function handleArchiveTask(task) {
    const newTask = { ...task, isArchived: !task.isArchived }
    await putTask(newTask)
    tasksDispatch({
      type: "update_task",
      task: newTask
    })
  }

  async function handleSaveTask() {
    await putTask(editedTask)
    console.log(editedTask)
    tasksDispatch({
      type: "update_task",
      task: editedTask
    })
    setEditing((prev) => !prev)
  }

  const editableContent = editing ? (
    <>
      <input
        value={editedTask.title}
        onChange={(e) =>
          setEditedTask((prev) => ({ ...prev, title: e.target.value }))
        }
      ></input>
      <button onClick={handleSaveTask}>save</button>
      <button
        onClick={() => {
          setEditing((prev) => !prev)
          setEditedTask(task)
        }}
      >
        cancel
      </button>
    </>
  ) : (
    <>
      <p>{task.title}</p>
      <button onClick={() => setEditing((prev) => !prev)}>edit</button>
    </>
  )

  return (
    <>
      <div>
        {editableContent}
        {/* <p>Completed: {task.isCompleted ? "Yes" : "No"}</p>
          <p>Archived: {task.isArchived ? "Yes" : "No"}</p> */}
        <button onClick={() => handleDeleteTask(task)}>delete</button>
        <button onClick={() => handleCompleteTask(task)}>
          toggle complete
        </button>
        <button onClick={() => handleArchiveTask(task)}>toggle archive</button>
      </div>
    </>
  )
}

export default TaskLine
