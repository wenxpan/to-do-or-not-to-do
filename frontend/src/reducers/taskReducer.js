export default function taskReducer(tasks, action) {
  switch (action.type) {
    case "add_task": {
      return [...tasks, action.task]
    }
    case "update_task": {
      return tasks.map((t) => {
        if (t.id === action.task._id) {
          return action.task
        } else {
          return t
        }
      })
    }
    case "delete_task": {
      return tasks.filter((t) => t._id !== action.task._id)
    }
    case "toggle_completed": {
      return tasks.map((t) => {
        if (t._id === action.task._id) {
          return { ...t, isCompleted: !t.isCompleted }
        } else {
          return t
        }
      })
    }
    case "toggle_archived": {
      return tasks.map((t) => {
        if (t._id === action.task._id) {
          return { ...t, isArchived: !t.isArchived }
        } else {
          return t
        }
      })
    }
  }
  throw Error("Unknown action: " + action.type)
}
