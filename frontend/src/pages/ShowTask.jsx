import React, { useContext, useEffect, useReducer, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import TaskContext from "../contexts/TaskContext"
import { putTask } from "../services/tasksService"
import ProgressLine from "../components/ProgressLine"
import editedTaskReducer from "../reducers/editedTaskReducer"
import TaskField from "../components/TaskField"
import TaskFieldRadio from "../components/TaskFieldRadio"

const ShowTask = ({ task }) => {
  if (task) {
    const location = useLocation()
    const [editing, setEditing] = useState(
      location.state ? location.state.editing : false
    )
    const [editedTask, editedTaskDispatch] = useReducer(editedTaskReducer, task)
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

    function getProps(area) {
      // return props to be passed to child componenets
      const fieldDesc = {
        doReason: "What can you achieve by doing it?",
        delayReason: "What keeps you from doing it?",
        additionalInfo: "Notes",
        isCompleted: "Completed",
        isArchived: "Archived"
      }
      const fields = [
        "isCompleted",
        "isArchived",
        "additionalInfo",
        "doReason",
        "delayReason"
      ]

      const contentProps = fields.map((f) => {
        return {
          area: f,
          handleChange,
          editing,
          editedValue: editedTask[f],
          initialValue: task[f],
          heading: fieldDesc[f]
        }
      })

      return contentProps.find((c) => c.area === area)
    }

    function handleChange(area, value) {
      // when onChange happens in each field
      editedTaskDispatch({ type: "update_area", area, value })
    }

    const titleContent = editing ? (
      <>
        <h2>Title:</h2>
        <textarea
          value={editedTask.title}
          onChange={(e) => handleChange("title", e.target.value)}
        ></textarea>
        <br />
      </>
    ) : (
      <h2>{task.title}</h2>
    )

    const tagContent = editing ? (
      <>
        <h3>Tags:</h3>
        <textarea
          value={editedTask.tags.join(", ")}
          onChange={(e) => handleChange("tags", e.target.value.split(", "))}
        ></textarea>
        <br />
      </>
    ) : (
      <>
        <p>tags: {task.tags.join(", ")}</p>
      </>
    )

    return (
      <div>
        <Link to="/tasks">
          <button>Back to list</button>
        </Link>
        {titleContent}
        {tagContent}
        <p>date added: {task.dateAdded.slice(0, 10)}</p>
        <TaskFieldRadio props={getProps("isCompleted")} />
        <TaskFieldRadio props={getProps("isArchived")} />
        <TaskField props={getProps("doReason")} />
        <TaskField props={getProps("delayReason")} />
        <TaskField props={getProps("additionalInfo")} />
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
