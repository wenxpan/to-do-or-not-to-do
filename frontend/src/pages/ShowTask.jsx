import React from "react"
import { Link } from "react-router-dom"

const ShowTask = ({ task }) => {
  console.log("rendered showtask")
  if (task) {
    console.log(task.progress)
    return (
      <div>
        <Link to="/tasks">
          <button>Back to list</button>
        </Link>
        <h2>{task.title}</h2>
        <p>tags: {task.tags.join(", ")}</p>
        <p>date added: {task.dateAdded.slice(0, 10)}</p>
        <p>Completed: {task.isCompleted ? "Yes" : "No"}</p>
        <p>Archived: {task.isArchived ? "Yes" : "No"}</p>
        <h3>What can you achieve by doing it?</h3>
        <p>{task.doReason}</p>
        <h3>What keeps you from doing it?</h3>
        <p>{task.delayReason}</p>
        <h3>Notes</h3>
        <p>{task.additionalInfo}</p>
        <h3>Progress:</h3>
        <p>{task.progress[0].date}</p>
        {task.progress.map((p) => {
          ;<p>progress</p>
        })}
        <button>Edit</button>
      </div>
    )
  }
}

export default ShowTask
