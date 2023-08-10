import React, { useContext } from "react"
import TaskContext from "../contexts/TaskContext"
import TaskLine from "../components/TaskLine"

const Archive = () => {
  const { tasks } = useContext(TaskContext)
  const archivedTasks = tasks.filter((t) => t.isArchived === true)

  return (
    <div>
      {archivedTasks.map((t) => (
        <TaskLine key={t._id} task={t} />
      ))}
    </div>
  )
}

export default Archive
