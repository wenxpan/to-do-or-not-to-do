import React, { useContext } from "react"
import TaskContext from "../contexts/TaskContext"
import TaskLine from "../components/TaskLine"
import AddTaskLine from "../components/AddTaskLine"

const Tasks = () => {
  console.log("rendered")
  const { tasks } = useContext(TaskContext)
  const todoTasks = tasks.filter(
    (t) => t.isCompleted === false && t.isArchived === false
  )
  const completedTasks = tasks.filter(
    (t) => t.isCompleted === true && t.isArchived === false
  )
  return (
    <>
      <h2>All To-dos</h2>
      <AddTaskLine />
      {todoTasks.map((t) => (
        <TaskLine key={t._id} task={t} />
      ))}
      <h2>Completed</h2>
      {completedTasks.map((t) => (
        <TaskLine key={t._id} task={t} />
      ))}
    </>
  )
}

export default Tasks
