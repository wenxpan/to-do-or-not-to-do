export default function editedTaskReducer(editedTask, action) {
  switch (action.type) {
    case "set_task": {
      return action.editedTask
    }

    case "update_area": {
      // expected to receive: action.area: {title: e.target.value}
      return { ...editedTask, ...action.area }
    }

    case "update_prog": {
      switch (action.protype) {
        case "edit_line": {
          // receive {type: 'update_prog', protype: 'edit_line', obj: oldProgLine, value: e.target.value }
          return {
            ...editedTask,
            progress: editedTask.progress.map((prog) =>
              prog === action.obj
                ? { ...prog, description: action.value }
                : prog
            )
          }
        }
        case "delete_line": {
          // receive {type: 'update_prog', protype: 'edit_line', obj: oldProgLine }
          return {
            ...editedTask,
            progress: editedTask.progress.filter((prog) => prog !== action.obj)
          }
        }
        case "add_line": {
          return {
            ...editedTask,
            progress: [...editedTask.progress, { description: "" }]
          }
        }
      }
    }

    case "clear_task": {
      return { title: "" }
    }
  }
  throw Error("Unknown action: " + action.type)
}
