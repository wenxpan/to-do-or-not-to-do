import React, { useContext, useState } from "react"
import TaskContext from "../contexts/TaskContext"
import { deleteTask, putTask } from "../services/tasksService"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const TaskLine = ({ task }) => {
  const nav = useNavigate()
  const { tasksDispatch } = useContext(TaskContext)
  const [isEditing, setIsEditing] = useState(false)
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
    setIsEditing((prev) => !prev)
  }

  const editButton = (
    <button
      onClick={() => {
        setIsEditing((prev) => !prev)
        setEditedTask(task)
      }}
    >
      {isEditing ? "Cancel" : "Edit"}
    </button>
  )

  const saveButton = isEditing && <button onClick={handleSaveTask}>Save</button>

  const checkBox = (
    <input
      type="checkbox"
      className="h-6 w-6 cursor-pointer hover:bg-blue-500/75"
      value="completed"
      checked={task.isCompleted ? "checked" : ""}
      onChange={() => handleCompleteTask(task)}
    />
  )

  const viewDetailButton = (
    <Link to={`/tasks/${task._id}`}>
      <button>View</button>
    </Link>
  )

  const titleEl = (
    <input
      value={editedTask.title}
      onChange={(e) =>
        setEditedTask((prev) => ({ ...prev, title: e.target.value }))
      }
      disabled={isEditing ? "" : "disabled"}
      className={`disabled:border-0 overflow-x-auto w-full px-2 bg-inherit ${
        task.isCompleted ? "line-through" : ""
      }`}
    ></input>
  )

  const deleteButton = (
    <button onClick={() => handleDeleteTask(task)} className="text-red-500">
      Delete
    </button>
  )

  const archiveButton = (
    <button onClick={() => handleArchiveTask(task)}>Toggle Archive</button>
  )
  return (
    <>
      <section className="my-2 flex items-center space-x-4 md:space-y-0 bg-cyan-300/25 hover:bg-cyan-300/50">
        {checkBox}
        <div className="flex-grow overflow-x-auto ">{titleEl}</div>
        <div className="flex-row space-x-3">
          {saveButton}
          {editButton}
          {viewDetailButton}
          {deleteButton}
          {archiveButton}
        </div>
      </section>
    </>
  )
}

export default TaskLine
