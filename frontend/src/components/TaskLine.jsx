import React, { useContext, useState } from "react"
import TaskContext from "../contexts/TaskContext"
import { deleteTask, putTask } from "../services/tasksService"
import { Link } from "react-router-dom"

const TaskLine = ({ task }) => {
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

  const saveButton = isEditing && <button onClick={handleSaveTask}>save</button>

  const viewDetailButton = (
    <Link to={`/tasks/${task._id}`}>
      <button>view</button>
    </Link>
  )

  const checkBox = (
    <input
      type="checkbox"
      className="h-6 w-6 "
      value="completed"
      checked={task.isCompleted ? "checked" : ""}
      onChange={() => handleCompleteTask(task)}
    />
  )
  const titleEl = (
    <input
      value={editedTask.title}
      onChange={(e) =>
        setEditedTask((prev) => ({ ...prev, title: e.target.value }))
      }
      disabled={isEditing ? "" : "disabled"}
      className={`disabled:border-0 ${task.isCompleted ? "line-through" : ""}`}
    ></input>
  )

  const deleteButton = (
    <button onClick={() => handleDeleteTask(task)}>delete</button>
  )

  const archiveButton = (
    <button onClick={() => handleArchiveTask(task)}>toggle archive</button>
  )
  return (
    <>
      <section className="border-2 my-2">
        {/* <div className="flex place-items-center"> */}
        {checkBox}
        {titleEl}
        {/* </div> */}
        {saveButton}
        {editButton}
        <div className="flex-row space-x-3">
          {viewDetailButton}
          {deleteButton}
          {archiveButton}
        </div>
      </section>
    </>
  )
}

export default TaskLine
