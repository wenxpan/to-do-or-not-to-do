import React from "react"

const ProgressLine = ({ props }) => {
  const { editing, task, editedTask, setEditedTask } = props
  if (!editing) {
    // viewing mode
    return (
      <>
        {task.progress.length ? (
          <ul>
            {task.progress.map((p) => (
              <li key={p._id}>{p.description}</li>
            ))}
          </ul>
        ) : (
          <p>None</p>
        )}
      </>
    )
  } else {
    // editing mode
    return (
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

  // return <div>{progressContent}</div>
}

export default ProgressLine

// variables needed: editing, task.progress, edited task, setEditedTask,
