import React, { useContext, useEffect, useReducer, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import TaskContext from "../contexts/TaskContext"
import { putTask } from "../services/tasksService"
import ProgressLine from "../components/ProgressLine"
import editedTaskReducer from "../reducers/editedTaskReducer"

const ShowTask = ({ task }) => {
  if (task) {
    const location = useLocation()
    const [editing, setEditing] = useState(
      location.state ? location.state.editing : false
    )
    const [editedTask, editedTaskDispatch] = useReducer(editedTaskReducer, {})

    useEffect(
      () => editedTaskDispatch({ type: "set_task", editedTask: task }),
      []
    )

    const { tasksDispatch } = useContext(TaskContext)

    async function handleUpdateTask() {
      // when clicking save button
      const newTask = await putTask(editedTask)
      tasksDispatch({
        type: "update_task",
        task: newTask
      })
      setEditing((prev) => !prev)
    }

    function handleChange(changedPart) {
      // when onChange happens in each field
      editedTaskDispatch({ type: "update_area", area: changedPart })
      // setEditedTask((prev) => ({ ...prev, ...changedPart }))
    }

    //TODO: make editable fields dry
    const titleContent = editing ? (
      <h2>
        <textarea
          value={editedTask.title}
          onChange={
            (e) => handleChange({ title: e.target.value })
            // setEditedTask((prev) => ({ ...prev, title: e.target.value }))
          }
        ></textarea>
      </h2>
    ) : (
      <h2>{task.title}</h2>
    )

    const tagContent = editing ? (
      <>
        <textarea
          value={editedTask.tags.join(", ")}
          onChange={(e) => handleChange({ tags: e.target.value.split(", ") })}
        ></textarea>
      </>
    ) : (
      <p>tags: {task.tags.join(", ")}</p>
    )

    const completedContent = editing ? (
      <>
        <p>Completed:</p>
        <label htmlFor="completed">Yes</label>
        <input
          checked={editedTask.isCompleted}
          type="radio"
          name="isCompleted"
          id="completed"
          onChange={(e) => handleChange({ isCompleted: true })}
        />
        <label htmlFor="not_completed">No</label>
        <input
          checked={!editedTask.isCompleted}
          type="radio"
          name="isCompleted"
          id="not_completed"
          onChange={(e) => handleChange({ isCompleted: false })}
        />
      </>
    ) : (
      <p>Completed: {task.isCompleted ? "Yes" : "No"}</p>
    )

    const archivedContent = editing ? (
      <>
        <p>Archived:</p>
        <label htmlFor="archived">Yes</label>
        <input
          checked={editedTask.isArchived}
          type="radio"
          name="isArchived"
          id="archived"
          onChange={(e) => handleChange({ isArchived: true })}
        />
        <label htmlFor="not_archived">No</label>
        <input
          checked={!editedTask.isArchived}
          type="radio"
          name="isArchived"
          id="not_archived"
          onChange={(e) => handleChange({ isArchived: false })}
        />
      </>
    ) : (
      <p>Archived: {task.isArchived ? "Yes" : "No"}</p>
    )

    const doContent = editing ? (
      <textarea
        value={editedTask.doReason}
        onChange={(e) => handleChange({ doReason: e.target.value })}
      ></textarea>
    ) : (
      <p>{task.doReason}</p>
    )

    const delayContent = editing ? (
      <textarea
        value={editedTask.delayReason}
        onChange={(e) => handleChange({ delayReason: e.target.value })}
      ></textarea>
    ) : (
      <p>{task.delayReason}</p>
    )

    const additionalContent = editing ? (
      <textarea
        value={editedTask.additionalInfo}
        onChange={(e) => handleChange({ additionalInfo: e.target.value })}
      ></textarea>
    ) : (
      <p>{task.additionalInfo}</p>
    )

    return (
      <div>
        <Link to="/tasks">
          <button>Back to list</button>
        </Link>
        {titleContent}
        {tagContent}
        <p>date added: {task.dateAdded.slice(0, 10)}</p>
        {completedContent}
        {archivedContent}
        <h3>What can you achieve by doing it?</h3>
        {doContent}
        <h3>What keeps you from doing it?</h3>
        {delayContent}
        <h3>Notes</h3>
        {additionalContent}
        <h3>Progress:</h3>
        <ProgressLine
          props={{ editing, task, editedTask, editedTaskDispatch }}
        />
        <button onClick={() => setEditing((prev) => !prev)}>
          {editing ? "Cancel" : "Edit"}
        </button>
        {editing ? <button onClick={handleUpdateTask}>Save</button> : ""}
      </div>
    )
  }
}

export default ShowTask
