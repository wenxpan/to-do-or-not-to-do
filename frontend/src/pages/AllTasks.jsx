import React, { useContext } from "react"
import TaskContext from "../contexts/TaskContext"
import TaskLine from "../components/TaskLine"
import AddTaskLine from "../components/AddTaskLine"

const AllTasks = () => {
  const { tasks } = useContext(TaskContext)
  const todoTasks = tasks.filter(
    (t) => t.isCompleted === false && t.isArchived === false
  )
  const completedTasks = tasks.filter(
    (t) => t.isCompleted === true && t.isArchived === false
  )
  return (
    <>
      <div className="container xs mx-auto">
        <h1 className="text-xl font-semibold">All To-dos</h1>
        <div className="">
          <AddTaskLine />
          {todoTasks.map((t) => (
            <TaskLine key={t._id} task={t} />
          ))}
          <h2>Completed</h2>
          {completedTasks.map((t) => (
            <TaskLine key={t._id} task={t} />
          ))}
        </div>
      </div>
    </>
  )
}

export default AllTasks
