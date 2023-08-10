import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import TaskContext from "../contexts/TaskContext"
import { putTask } from "../services/tasksService"

const ShowTask = ({ task }) => {
  if (task) {
    const [editedTask, setEditedTask] = useState(task)
    const [editing, setEditing] = useState(false)
    const { tasksDispatch } = useContext(TaskContext)

    async function handleSaveTask() {
      const newTask = await putTask(editedTask)
      console.log(editedTask)
      tasksDispatch({
        type: "update_task",
        task: newTask
      })
      setEditing((prev) => !prev)
    }

    //TODO: make editable fields dry
    const titleContent = editing ? (
      <h2>
        <textarea
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask((prev) => ({ ...prev, title: e.target.value }))
          }
        ></textarea>
      </h2>
    ) : (
      <h2>{task.title}</h2>
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
          onChange={(e) =>
            setEditedTask((prev) => ({
              ...prev,
              isCompleted: !prev.isCompleted
            }))
          }
        />
        <label htmlFor="not_completed">No</label>
        <input
          checked={!editedTask.isCompleted}
          type="radio"
          name="isCompleted"
          id="not_completed"
          onChange={(e) =>
            setEditedTask((prev) => ({
              ...prev,
              isCompleted: !prev.isCompleted
            }))
          }
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
          onChange={(e) =>
            setEditedTask((prev) => ({
              ...prev,
              isArchived: !prev.isArchived
            }))
          }
        />
        <label htmlFor="not_archived">No</label>
        <input
          checked={!editedTask.isArchived}
          type="radio"
          name="isArchived"
          id="not_archived"
          onChange={(e) =>
            setEditedTask((prev) => ({
              ...prev,
              isArchived: !prev.isArchived
            }))
          }
        />
      </>
    ) : (
      <p>Archived: {task.isArchived ? "Yes" : "No"}</p>
    )

    const doContent = editing ? (
      <textarea
        value={editedTask.doReason}
        onChange={(e) =>
          setEditedTask((prev) => ({ ...prev, doReason: e.target.value }))
        }
      ></textarea>
    ) : (
      <p>{task.doReason}</p>
    )

    const delayContent = editing ? (
      <textarea
        value={editedTask.delayReason}
        onChange={(e) =>
          setEditedTask((prev) => ({ ...prev, delayReason: e.target.value }))
        }
      ></textarea>
    ) : (
      <p>{task.delayReason}</p>
    )

    const additionalContent = editing ? (
      <textarea
        value={editedTask.additionalInfo}
        onChange={(e) =>
          setEditedTask((prev) => ({ ...prev, additionalInfo: e.target.value }))
        }
      ></textarea>
    ) : (
      <p>{task.additionalInfo}</p>
    )

    let progressContent
    if (!editing) {
      progressContent = task.progress.length ? (
        <ul>
          {task.progress.map((p) => (
            <li key={p._id}>{p.description}</li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )
    } else {
      // editing mode
      progressContent = (
        <>
          {editedTask.progress.map((p, index) => (
            <div key={index}>
              <input
                value={p.description}
                onChange={(e) =>
                  setEditedTask((prev) => ({
                    ...prev,
                    progress: [
                      ...prev.progress.map((pro) =>
                        pro === p ? { ...p, description: e.target.value } : pro
                      )
                    ]
                  }))
                }
              ></input>
              <button
                onClick={() =>
                  setEditedTask((prev) => ({
                    ...prev,
                    progress: prev.progress.filter((pro) => pro !== p)
                  }))
                }
              >
                delete
              </button>
              <br />
            </div>
          ))}
          {/* <input placeholder="new progress"></input> */}
          <button
            onClick={() =>
              setEditedTask((prev) => ({
                ...prev,
                progress: [...prev.progress, { description: "" }]
              }))
            }
          >
            Add new
          </button>
          <br />
        </>
      )
    }

    return (
      <div>
        <Link to="/tasks">
          <button>Back to list</button>
        </Link>
        {titleContent}
        <p>tags: {task.tags.join(", ")}</p>
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
        {progressContent}
        <button onClick={() => setEditing((prev) => !prev)}>
          {editing ? "Cancel" : "Edit"}
        </button>
        {editing ? <button onClick={handleSaveTask}>Save</button> : ""}
      </div>
    )
  }
}

export default ShowTask
