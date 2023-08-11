import React from "react"

const ProgressLine = ({ props }) => {
  const { editing, task, editedTask, editedTaskDispatch } = props

  function handleChange(desc, updatedParts) {
    editedTaskDispatch({
      type: "update_prog",
      protype: desc,
      ...updatedParts
    })
  }

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
              onChange={(e) => {
                handleChange("edit_line", { obj: p, value: e.target.value })
              }}
            ></input>
            <button
              onClick={() => {
                handleChange("delete_line", { obj: p })
              }}
            >
              delete
            </button>
            <br />
          </div>
        ))}
        <button
          onClick={() => {
            handleChange("add_line")
          }}
        >
          Add new
        </button>
        <br />
      </>
    )
  }
}

export default ProgressLine
