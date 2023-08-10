import React from "react"
import { Link } from "react-router-dom"

const ShowTask = ({ task }) => {
  console.log("rendered showtask")
  if (task) {
    return (
      <div>
        <Link to="/tasks">
          <button>Back to list</button>
        </Link>
        <p>Task</p>
        <p>id: {task._id}</p>
      </div>
    )
  }
}

export default ShowTask
