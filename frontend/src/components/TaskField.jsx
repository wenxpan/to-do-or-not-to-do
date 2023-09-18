import React from "react"

const TaskField = ({ props }) => {
  const { area, handleChange, editing, editedValue, initialValue, heading } =
    props
  return (
    <>
      <h3 className="font-semibold">{heading}</h3>
      {!editing ? (
        <>
          <p>{initialValue}</p>
        </>
      ) : (
        <textarea
          value={editedValue}
          onChange={(e) => handleChange(area, e.target.value)}
        ></textarea>
      )}
    </>
  )
}

export default TaskField
