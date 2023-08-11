export default function editedTaskReducer(editedTask, action) {
  switch (action.type) {
    case "set_progress": {
      return action.tasks
    }
    case "add_progress": {
      return [...tasks, action.task]
    }
    case "update_progress": {
      return tasks.map((t) => {
        if (t._id === action.task._id) {
          return action.task
        } else {
          return t
        }
      })
    }
    case "delete_progress": {
      return tasks.filter((t) => t._id !== action.task._id)
    }
  }
  throw Error("Unknown action: " + action.type)
}
