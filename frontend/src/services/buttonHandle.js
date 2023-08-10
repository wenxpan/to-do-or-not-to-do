function handleAddTask(task) {
  tasksDispatch({
    type: "add_task",
    task
  })
  setNewTask({ title: "" })
}

function handleDeleteTask(task) {
  tasksDispatch({
    type: "delete_task",
    task
  })
}

function handleCompleteTask(task) {
  tasksDispatch({
    type: "toggle_completed",
    task
  })
}

function handleArchiveTask(task) {
  tasksDispatch({
    type: "toggle_archived",
    task
  })
}
